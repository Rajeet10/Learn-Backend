const { Router } = require('express');
const express=require('express')
const mongoose=require('mongoose')

const app=express();

app.listen(3000);
// Route,req,res
app.get('/',  (req, res)=> {
    res.sendFile('D:/PepCoding/Backend/views/index.html') //send full path or abolute u like here
  })

app.get('/about',  (req, res)=> {
    // res.send('<h1>about</h1>')
    res.sendFile('./views/about.html',{root:__dirname})
    // #here use absolute path and gib=ve root directory as rootname
  })

  //redirect
  app.get('/about-us',(req,res)=>{
      res.redirect('/about')
  })

  //404-->dont put at begining otherwise this will load first as other check not pass it checks first one and gives 404
  app.use((req,res)=>{
      res.status(404).sendFile('./views/404.html',{root:__dirname});
  })

  
