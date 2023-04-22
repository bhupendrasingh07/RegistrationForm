//require module
const express=require("express")
const app= express();
var fs = require('fs')
var cors = require('cors')
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const multer = require('multer');
const path = require('path');
const userData =require("./model/schema");
const bodyParser = require('body-parser')
app.use(cors())
dotenv.config();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Connect  Mongoose
mongoose.connect(process.env.URL).then(()=>{
    console.log("Database connected")
}).catch((err)=>console.log(err))

//Multer Middleware
  const upload = multer({
      storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '/upload');
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
      },
    }),
  });
  
// Define route to handle registration form submissions
  app.get('/',(req,res)=>{
    res.send("api is working")
  })

  // Define route to handle registration form submissions
  app.post('/register',  upload.fields([{ name: 'imgdata1', maxCount: 1 }, { name: 'imgdata2', maxCount: 1 }]), (req, res) => {
    const { fname, lname, bio,email, phone,address1,address2,city,fb,pincode,twitter,insta } = req.body;
    const { imgdata1,imgdata2 } = req.file;
    // Do something with the form data and file here
    res.json({ message: 'Registration successful!' });
  });
  

  

app.listen(process.env.PORT||5000, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });