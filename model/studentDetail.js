const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/studentDetails')

const studentSchema = mongoose.Schema({
  studentname :{
    type : String,
    required : true,
    lowercase : true,
  },
  rollno : {
    type : String,
    required : true,
    unique : true,
    lowercase : true

  },
  className : {
    type : Number,
    required : true
  }
})

module.exports = mongoose.model('student',studentSchema)