const { Console } = require('console');
const http=require('http')
const fs=require('fs')
const _=require('lodash')

const server=http.createServer((req,res)=>{
    console.log("req has beeen made from browser to server");
    console.log(req.method)
    console.log(req.url)

    // res.setHeader('Content-Type','text/plain')
    
    // res.setHeader('Content-Type','text/html')
    // res.write("<h1>hello love</h1>")
    // res.end()
    //lodash
    let num=_.random(0,20);
    console.log(num)
    const greet=_.once(()=>{
        console.log("hello")
    })
    greet();
    greet();
    let path='./views';
    switch(req.url){
        case '/':
            path+='/index.html'
            res.statusCode=200
            break;
        case '/about':
            path+='/about.html'
            res.statusCode=200
            break;
        case '/about-me1'://redirect
        res.statusCode=301;
        res.setHeader('Location','/about')
        res.end();
        break;
            default:
                path+='/404.html'
                res.statusCode=400
                break;
    }
    //     fs.readFile('./views/index.html',(error,file)=>{
    //     if(error){
    //         console.log(error)
    //     }
    //     else{
    //         res.write(file);
    //         res.end();
    //     }
    // })

    fs.readFile(path,(err,fileData)=>{
        if(err){
            console.log(err)
        }
        else{
            res.end(fileData)
        }
    })
})

//portn,host,callbackfunction
server.listen(3000,'localhost',()=>{
    console.log("server is listening")
});