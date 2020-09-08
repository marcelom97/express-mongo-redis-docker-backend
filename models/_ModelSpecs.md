User

- username : String
- email: String
- password: String
- firstname: String
- lastname: String
- role: String, enum: ['user','admin']
- resetPasswordToken: String
- resetPasswordExpire: Date
- createdAt: Date

Room

- name: String
- owner: String
- users: [ObjectId(User)]
- createdAt: Date

Messages

- message: String
- name: String
- timestamp: String
