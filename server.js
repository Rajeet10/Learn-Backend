const http=require('http')
const fs=require('fs')
const _=require('lodash')
var express = require('express')
var cors = require('cors')
var app = express()
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const server=http.createServer((req,res)=>{
    console.log("request has been made from browswer");
    // res.setHeader('Content-Type','text/plain')
    res.setHeader('Content-Type','text/html')
    // res.write('Hello')
    // res.write('<h1>hi</h1>')
    // res.end()

//lodash
let num=_.random(0,20)
console.log(num);

//print once
let greet=_.once(()=>{
    console.log('hello');
})
greet();
greet();

    let path='./views'
    switch(req.url){
        case '/':
            path+='/index.html'
            res.statusCode=200
            break;
        case '/about':
            path+='/about.html'
            break;
        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location','/about')
            res.end()
            break;
        default:
            path+='/404.html'
            res.statusCode=400
    }
    // fs.readFile('./views/index.html',(err,fileData)=>{
    fs.readFile(path,(err,fileData)=>{
       if(err){
           console.log(err)
       } 
       else{
           res.write(fileData)
           res.end()
       }
    })
})

server.listen(3000,'localhost',()=>{
    console.log('server listening')
})