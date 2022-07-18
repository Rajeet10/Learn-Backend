const emailValidator=require('email-validator')

// will show undefined if not use middleware
//middleware function->post->json
const bcrypt=require('bcrypt');
const mongoose=require('mongoose')



//mongoose
const db_link='mongodb+srv://admin:5O5oNnLmbPmIU2xD@cluster0.mlv26.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(db_link)
.then(function(db){
    console.log(db)
  console.log('db connect')
})
.catch(function(err){
  console.log(err)
})


//make schema

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String, 
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email)
        }
    },
    password:{
        type:String,
        required:true,
        minLength:7,
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:7,
        validate:function(){
            return this.confirmPassword=this.password
        }
    }
});

//mongoose hook
//pre hook
userSchema.pre('save',function(){
    console.log("before saving in db",this);
})

//bcrypt
userSchema.pre('save',async function(){
    let salt=await bcrypt.genSalt();
    let hashedString =await bcrypt.hash(this.password,salt);
    // console.log(hashedString);
    this.password=hashedString;
})

//post hook
//after save event occurs
userSchema.post('save',function(doc){
    console.log("after saving in db",doc);
})

//models
const userModel=mongoose.model('userModel',userSchema);//from which schema to make model
// (async function createUser(){
//     let user={
//         name:'ram',
//         email:'abcd@gmail.com',
//         password:'12345678',
//         confirmPassword:'12345678'
//     };
//     let data=await userModel.create(user);
//     console.log(data);
// })();

module.exports=userModel