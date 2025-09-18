const express = require('express')
const app = express()
const path = require('path')
const studentDetail = require('./model/studentDetail')

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,"public")))
app.set(express.json())
app.use(express.urlencoded({extended : true}))




app.get('/addstudent',(req,res)=>{
  res.render('addstudent')
})


app.get('/student',async (req,res)=>{
  let allStudents = await studentDetail.find()
  res.render('student',{allStudents})
})

app.get('/delete/:id',async (req,res)=>{
  let deleteStudent = await studentDetail.findOneAndDelete({_id : req.params.id})
  res.redirect('/student')
}) 

app.get('/update/:id',async (req,res)=>{
  let findStudent = await studentDetail.findOne({_id : req.params.id})
  res.render('stdDetailsUpdate',{findStudent})
})

app.get('/findbyname',async (req,res)=>{
  let {findName,sort} =  req.query;
  let query = {};

  query[sort] = findName.toLowerCase()
  console.log(req.query)
   
  let findStudent = await studentDetail.find(query)
  res.render('findedStudent',{findStudent})
  // res.send(findStudent) 
  
})


app.post('/sudentcreate',async (req,res)=>{
try{

     let {studentname,rollno,className} = req.body;
 let createdStudent = await studentDetail.create({

    studentname,
    className,
    rollno

 })

 res.redirect('/student')

}catch(error){
  if(error.code === 11000){

    res.render('rollnoerror')
  }
  else{
    res.status(500).send('some error come')
  }
}


})


app.post('/updateStudent/:id',async (req,res)=>{

 let {studentname,rollno,className} = req.body;
 let updatedStudent = await studentDetail.findOneAndUpdate({_id : req.params.id} , {studentname,rollno,className})

 res.redirect('/student')

})

app.use((req, res, next) => {
  res.status(404).render("404", { url: req.originalUrl });
});

app.listen(3000)