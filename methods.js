const express=require('express')

const app=express()
// will show undefined if not use middleware
//middleware function->post->json
app.use(express.json()) //global middleware

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


function getUser(req,res){
  
    console.log(req.query)
    res.send(users);
}

function postUser(req,res){//send data from frontend to backend
    console.log(req.body)
    users=req.body;
    res.json({
        messages:"data receieved successfully",
        user:req.body
    });
};


function updateUser(req,res){
    console.log('req-body->',req.body)
    //update data in users object
    let dataToBeUpdated=req.body;
    for(key in dataToBeUpdated){
        users[key]=dataToBeUpdated[key];//key =age
    }
    res.json({
        messages:"data updated sucessfully",
    })
}

function deleteUser(req,res){
    users={}
    res.json({
        messages:"data deleted"
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

function getSignup(req,res,next){
    console.log("get signup called")
    res.sendFile('/public/index.html',{root:__dirname});
    next();

}

function postSignup(req,res){
    let obj=req.body;
    console.log("backend",obj)
    res.json({
        message:"user signed up",
        data:obj
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