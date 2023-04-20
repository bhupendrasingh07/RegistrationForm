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
const { send } = require("process");
app.use(cors())
dotenv.config();

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
  

  app.get('/',(req,res)=>{
    res.send("api is working")
  })

  // Define route to handle registration form submissions
app.post('/api/register',  upload.fields([{ name: 'imgdata1', maxCount: 1 }, { name: 'imgdata2', maxCount: 1 }]), (req, res) => {
    const { fname, lname, bio,email, phone,address1,address2,city,fb,pincode,twitter,insta } = req.body;
    const { imgdata1,imgdata2 } = req.file;
    // Do something with the form data and file here
    res.json({ message: 'Registration successful!' });
  });
  

  

// const upload = multer({ storage });

// app.use(express.static('public'));

// app.post('/api/register', upload.single('p_img'), (req, res) => {
//   const { fname, lname, bio,email, phone,address1,address2,city,fb,pincode,twitter,insta} = req.body;
//   const p_img = req.file.filename;

//   console.log({ fname, lname, bio,email, phone,address1,address2,city,fb,pincode,twitter,insta, p_img });

//   res.send('Registration successful');
// });

app.listen(process.env.PORT||5000, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });