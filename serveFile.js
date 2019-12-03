var express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect("mongodb://localhost:27017/project");
app.use(express.urlencoded())
var bodyParser=require('body-parser');
//const url=require("url");
var session=require('express-session');
app.use(express.json());
app.use(express.static('public'));
app.use(session({'secret':'fghvcdhshhgvjhfsbhvvh746ghjb',saveUninitialized:true,resave:true}));
var flag=0;
var flag2=0;
var flag3=0;

app.set('view engine', 'ejs');
//mongoose.connect("mongodb://localhost:27017/ecom",{ useNewUrlParser: true },{ useUnifiedTopology: true } );//connection with database
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connection.on('error', (err) => {
  console.log('DB connection Error');
});

mongoose.connection.on('connected', (err) => {
  console.log('DB connected');
});
mongoose.set('useFindAndModify', false);
var Schema=mongoose.Schema;

let Question=new Schema({
    Quesid:Number,
    Quesname:String,
    Quesdesc:String,
    option1:String,
    option2:String,
    option3:String,
    option4:String,
    marks:String,
    answer:String,

});

let Users=new Schema({
    name:String,
    username:String,
    password:String,
    email:String,
    
});

let Logedinuser=new Schema({
  
    username:String,
    password:String,
    
});

let Answer=new Schema({

    uid:String,
    qid:Number,
    Quesname:String,
    Quesdesc:String,
    option1:String,
    option2:String,
    option3:String,
    option4:String,
    marks:String,
    answer:Number,
    
    })
    

var user = mongoose.model('users', Users);
var logedinuser = mongoose.model('logedinuser', Logedinuser);
var ques = mongoose.model('ques', Question);
var ans = mongoose.model('ans', Answer);

app.get("/login.html",function(req,res)
       {
    res.sendFile(__dirname+"/login.html");
});

app.get("/signup.html",function(req,res)
       {
    res.sendFile(__dirname+"/signup.html");
});

app.get("/viewProducts.html",function(req,res)
       {
           if(flag2==1)
    res.sendFile(__dirname+"/viewProducts.html");
    else res.redirect('login.html');
});

app.get("/cartProducts.html",function(req,res)
       {
           if(flag2==1)
    res.sendFile(__dirname+"/cartProducts.html");
    else res.redirect('login.html');
});

app.get("/AdminProducts.html",function(req,res)
       {
           if(flag==1)
    res.sendFile(__dirname+"/AdminProducts.html");

   else res.redirect('/login.html')
});

app.post('/adduser',(req,res)=>{
    var len=JSON.parse(req.body.userList).length;
    var sData=new user();
    sData.name=JSON.parse(req.body.userList)[len-1].name;
    sData.username=JSON.parse(req.body.userList)[len-1].username;
    sData.email=JSON.parse(req.body.userList)[len-1].email;
    sData.password=JSON.parse(req.body.userList)[len-1].password;

    sData.save(function(err)
    {
    if(err)
     {
         console.log("Error");
     }
     res.redirect('/login.html');
 });
})

app.get('/adduser',(req,res)=>{
    console.log('running it');
    user.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        console.log(docs);
        res.send(docs);
       
    });
  });

  app.post('/loginarray',(req,res)=>{
  

    var len=JSON.parse(req.body.logarray).length;
    var sData=new logedinuser();
     if(JSON.parse(req.body.logarray)[len-1].username=='chitkara')
     flag=1;

     console.log("login array flag is: "+flag);
    sData.username=JSON.parse(req.body.logarray)[len-1].username;
    
    sData.password=JSON.parse(req.body.logarray)[len-1].password;

    sData.save(function(err)
 {
 if(err)
     {
         console.log("Error");
     }
     res.redirect('/signup.html');
 });
})

app.post('/setSession',(req,res)=>{
    
    req.session.username=JSON.parse(req.body.username);
   

   if(req.session.username=='chitkara'){
       flag=1;
       
   }
   else if(req.session.username=='logout'){
       flag=0;
       flag2=0;
   }

   else 
   {
       flag=0;
       flag2=1;
   }
})

app.post('/array',(req,res) => {
    console.log("running it");
  var len=JSON.parse(req.body.productList).length;
     var sData=new ques();
     sData.Quesid=JSON.parse(req.body.productList)[len-1].Quesid+1;
  sData.Quesname=JSON.parse(req.body.productList)[len-1].Quesname;
  sData.Quesdesc=JSON.parse(req.body.productList)[len-1].Quesdesc;
 
   sData.option1=JSON.parse(req.body.productList)[len-1].option1;
     sData.option2=JSON.parse(req.body.productList)[len-1].option2;
     sData.option3=JSON.parse(req.body.productList)[len-1].option3;
     sData.option4=JSON.parse(req.body.productList)[len-1].option4;
     sData.answer=JSON.parse(req.body.productList)[len-1].answer;
     sData.marks=JSON.parse(req.body.productList)[len-1].marks;
  sData.save(function(err)
 {
 if(err)
     {
         console.log("Error");
     }
     res.redirect('/AdminProducts.html');
 });        
 });

 app.get('/array',(req,res)=>{
    console.log('running it');
    ques.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        console.log(docs);
        res.send(docs);
       
    });
  });
  
  app.post('/update',(req,res)=>{
   
    //console.log(JSON.parse(req.body.obj));
    var ob=(JSON.parse(req.body.obj));
       console.log(ob.Quesname);

    var myquery = { Quesname: ob.Quesname };
  var newvalues = { $set: { Quesname: ob.Quesname, Quesdesc:ob.Quesdesc,option1:ob.option1,option2:ob.option2,
                            option3:ob.option3,option4:ob.option4,answer:ob.answer,marks:ob.marks } };
   
    ques.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("1 document updated");

  });
});

app.post('/delete',(req,res)=>{

   // console.log("Quesname--------------------: "+JSON.parse(req.body.Quesname));
   
     ques.findOneAndRemove({'Quesname':JSON.parse(req.body.Quesname)}, function(err){
         if (err){
             throw err;
             
         }
         console.log('deleted');
     });
   });
   
   app.get('/array',(req,res)=>{
    console.log('running it');
    ques.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        console.log(docs);
        res.send(docs);
       
    });
  });
  
  app.get('/loginarray',(req,res)=>{
    console.log('running it');
    logedinuser.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        console.log(docs);
        res.send(docs);
       
    });
  });

  app.post('/ansarray',(req,res) => {
    console.log("running it");
    var len=JSON.parse(req.body.productList).length;
       var sData=new ans();
       sData.uid=JSON.parse(req.body.productList)[len-1].uid;
       sData.qid=JSON.parse(req.body.productList)[len-1].qid;
    sData.Quesname=JSON.parse(req.body.productList)[len-1].Quesname;
    sData.Quesdesc=JSON.parse(req.body.productList)[len-1].Quesdesc;
    sData.option1=JSON.parse(req.body.productList)[len-1].option1;
    sData.option2=JSON.parse(req.body.productList)[len-1].option2;
    sData.option3=JSON.parse(req.body.productList)[len-1].option3;
    sData.option4=JSON.parse(req.body.productList)[len-1].option4;
    sData.marks=JSON.parse(req.body.productList)[len-1].marks;
       sData.answer=JSON.parse(req.body.productList)[len-1].answer;
   
    sData.save(function(err)
   {
   if(err)
       {
           console.log("Error");
       }
       res.redirect('/CartProducts.html');
  
   });    
   });
  
   app.get('/ansarray',(req,res)=>{
    console.log('running it');
    ans.find({},function(err,docs){
        if(err)
            {
                console.log("error");
            }
        console.log(docs);
        res.send(docs);
       
    });
  });
  
  app.post('/ansupdate',(req,res)=>{
   
    //console.log(JSON.parse(req.body.obj));
    var ob=(JSON.parse(req.body.obj));
       console.log(ob.uid);

    var myquery = { Quesname: ob.Quesname, uid: ob.uid };
  var newvalues = { $set: { Quesname: ob.Quesname, Quesdesc:ob.Quesdesc,answer:ob.answer } };
   
    ans.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
        else
    console.log("1 document updated");

  });
});

app.post('/emptyans',(req,res)=>{

    
    var ob=(JSON.parse(req.body.username));
    
      ans.remove({'uid':ob}, function(err){
          if (err){
              throw err;
              
          }
          console.log('deleted');
      });
    });


  app.listen(3000);