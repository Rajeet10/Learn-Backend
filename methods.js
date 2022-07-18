const express=require('express')
const userModel=require('./models/userModel')
const app=express()
app.use(express.json());
// will show undefined if not use middleware
//middleware function->post->json

const mongoose=require('mongoose')


app.listen(3000)


let users=[
    //for params
{ 
    "id":1,
    "name":"rajeet",
},
{ 
    "id":2,
    "name":"messi"
},

]
//creating miniapp
const userRouter=express.Router();
// which route and router to use
app.use('/user',userRouter)
userRouter
.route('/')
.get(getUser)//pathspecific middleware
.post(postUser)//pathspecific middleware
.patch(updateUser)//pathspecific middleware
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserById)

//for signup miniapp
const authRouter=express.Router();
app.use("/auth",authRouter);

authRouter
.route('/signup')
.get(middleware1,getSignup,middleware2)
.post(postSignup)


// app.get('/user',)

// app.post('/user')
// note:when we send data from front end to backend it goes to req body


//update
// app.patch('/user',) 


//delete

// app.delete('/user')


//params
// app.get('/user/:id',)


async function getUser(req,res){
  
    // console.log(req.query)
    let allUsers=await userModel.findOne({
        name:"rajeet"
    });
    res.json({
        message:'list of all users',
        data:allUsers,
    
    });
}

function postUser(req,res){//send data from frontend to backend
    console.log(req.body)
    users=req.body;
    res.json({
        messages:"data receieved successfully",
        user:req.body
    });
};


async function updateUser(req,res){
    console.log('req-body->',req.body)
    //update data in users object
    let dataToBeUpdated=req.body;
    let user=await userModel.findOneAndUpdate({email:'ema123@gmail.com'},dataToBeUpdated)
    // for(key in dataToBeUpdated){
    //     users[key]=dataToBeUpdated[key];//key =age
    // }
    res.json({
        messages:"data updated sucessfully",
        data:user 
    })
}

async function deleteUser(req,res){
    // users={}
    let dataToBeDeleted=req.body;
    let user =await userModel.findOneAndDelete({dataToBeDeleted})
    res.json({
        messages:"data deleted",
        data:user
    })
}

function getUserById(req,res ) {
    console.log(req.params.id)
    let paramID=req.params.id
;
for(let i=0;i<users.length;i++){
    if(users[i]['id']==paramID){
        obj=users[i];
    }
}    
    res.json({
        message:"user id is recieved",
        data:obj
        
    });
    
}


//signup

async function getSignup(req,res,next){
    // let dataObj=req.body;
    // let user=await userModel.create(dataObj) 
    console.log("get signup called")
    res.sendFile('/public/index.html',{root:__dirname});
    next();

}

async function postSignup(req,res){
    let dataObj=req.body;  //data object
    let user=await userModel.create(dataObj)
    console.log("backend",user)
    res.json({
        message:"user signed up",
        data:user
    });
};

//midlleware can end or cut req and res cycle

function middleware1(req,res,next){
    console.log("middleware1 encountered");
    next();
}

function middleware2(req,res){
    console.log("middleware2 encountered");
    // next();
    console.log("middleware 2 ended re/req cycle")
    res.sendFile('/public/index.html',{root:__dirname});
}


