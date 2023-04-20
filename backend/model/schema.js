const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
 fname:{type:String,required:true},
 lname:{type:String,required:true},
 bio:{type:String,required:true},
 email:{type:String,required:true},
 phone:{type:String,required:true},
 address1:{type:String,required:true},
 address2:{type:String,required:true},
 city:{type:String,required:true},
 state:{type:String,required:true},
 country:{type:String,required:true},
 pincode:{type:String,required:true},
//  social icon
fb:{type:String,required:true},
twitter:{type:String,required:true},
insta:{type:String,required:true},
// photo
imgdata1:{type:String,required:true},
imgdata2:{type:String,required:true},
// banner:{type:String,required:true}

})

const user= mongoose.model("user",userSchema)
module.exports=user;