/* eslint prefer-object-spread: "off" */
const mongoose = require('mongoose');
const redis = require('redis');
const { promisify } = require('util');

const redisUrl = 'redis://redis:6379';
const client = redis.createClient(redisUrl);
client.hmset = promisify(client.hmset);
client.hget = promisify(client.hget);

const { exec } = mongoose.Query.prototype;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;

  this.hashKey = JSON.stringify(options.key || 'default');

  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getFilter(), {
      collection: this.mongooseCollection.name,
    })
  );

  // See if we have a value for `key` in redis
  const cacheValue = await client.hget(this.hashKey, key);
  // if we do, return that
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc) ? doc.map((d) => new this.model(d)) : new this.model(doc);
  }
  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments);

  client.hmset(this.hashKey, key, JSON.stringify(result), 'EX', 10);

  return this.model(result);
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
