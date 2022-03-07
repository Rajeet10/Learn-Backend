const express=require('express')

const app=express()
// will show undefined if not use middleware
//middleware function->post->json
app.use(express.json())

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

app.get('/user',(req,res)=>{
    console.log(req.query)
    res.send(users);
})

app.post('/user',(req,res)=>{//send data from frontend to backend
console.log(req.body)
users=req.body;
res.json({
    messages:"data receieved successfully",
    user:req.body
});
})
// note:when we send data from front end to backend it goes to req body


//update
app.patch('/user',(req,res)=>{
    console.log('req-body->',req.body)
    //update data in users object
    let dataToBeUpdated=req.body;
    for(key in dataToBeUpdated){
        users[key]=dataToBeUpdated[key];//key =age
    }
    res.json({
        messages:"data updated sucessfully",
    })
}) 


//delete

app.delete('/user',(req,res)=>{
    users={}
    res.json({
        messages:"data deleted"
    })
})


//params
app.get('/user/:username',(req,res)=>{
    console.log(req.params.username)
    console.log(req.params);
    
    res.send("user id is recieved");
    
})