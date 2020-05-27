import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import data from './data/data.json';

const app = express();
const PORT = 3000;

app.use(express.static('public'))
app.use(favicon(path.join(__dirname,'public','favicon.ico')));
//method to use json
//app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/images',express.static('images'));

app.get('/',(req,res)=>{
    //res.send(`get request / route on port ${PORT}`)
    res.json(data)
});

//JSON data
//{"data":"value"}
//URL encoded data
//data = URLEncoded + value

app.post('/newItem',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
});

app.get('/item/:id',(req,res,next)=>{
    //this is the middleware that pull the data
    console.log(req.params.id)
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    res.send(data[user]);
    //this is the middleware that uses to req object
    console.log(`request from ${req.originalUrl}`)
    console.log(`request from ${req.method}`)
    next();
},(req,res)=>{
    console.log('Did you get the right data?')
});

app.route('/item')
    .get((req,res)=> {
        //throw new Error(); //throws a error
        //res.download('images/rocket.jpg')
        //res.redirect('http://linkedin.com')
        //res.end(); //nothing happens
        res.send(`get request /item route on port ${PORT}`)
    })
    .put((req,res)=>
    res.send(`put request /newItem route on port ${PORT}`)
    ).delete((req,res)=>
        res.send(`delete request /item route on port ${PORT}`)
);

//Error handling functions
app.use((err,req,res,next) =>{
    console.error(err.stack);
    res.status(500).send(`red alert!:${err.stack}`)
});

app.listen(PORT,()=>{
    console.log(`our server is running on port ${PORT}`);
    console.log(data);
});
