const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  profession: {
    type: String,
    required: true,
  },
  reason:[{
    type: String
  }],
  joining:{
    type: String,
    required: true,
  },
  email:{
    type:String,
    lowercase:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Users', UserSchema)