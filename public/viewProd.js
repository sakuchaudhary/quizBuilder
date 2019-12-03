var ansArray=[];
var retrievedArray=[];
var ansId=0;
var userArray=[];
var showListProducts=document.getElementById("showListProducts");
var showname=document.getElementById("Show");
var Name=document.getElementById("name");
var Logout=document.getElementById("logout");



function addProducttoDOM(newObj)
{
  var listdiv1=document.createElement("div");
  listdiv1.setAttribute("id",newObj.Quesid);
  var QuesName=newObj.Quesname;
  var QuesDesc=newObj.Quesdesc;
  var opt1=newObj.option1;
  var opt2=newObj.option2;
  var opt3=newObj.option3;
  var opt4=newObj.option4;
  var Marks=newObj.marks;

  var label1=document.createElement("h4");
  var label2=document.createElement("h4");
  var label3=document.createElement("h4");
  var label4=document.createElement("h4");
  var label5=document.createElement("h4");
  var label6=document.createElement("h4");
  var label7=document.createElement("h3");
  var qid=newObj.Quesid;

  label1.setAttribute("style","font-size:40px")
  label1.innerHTML=qid+": Question Name: "+QuesName;
  label2.innerHTML="Question Desc: "+QuesDesc;
  label3.innerHTML="option1: "+opt1;
  label4.innerHTML="option2: "+opt2;
  label5.innerHTML="option3: "+opt3;
  label6.innerHTML="option4: "+opt4;
  label7.innerHTML="marks: "+Marks;
  
  var inputAns=document.createElement("input");
  inputAns.setAttribute("placeholder","Enter Answer");
  inputAns.setAttribute("type","number");
  inputAns.setAttribute("style","margin:left:5px; width: 20%; height:5%;  margin-top:8px; margin-left:2px;");
  inputAns.setAttribute("id","inputAns");
  
  var submit=document.createElement("button");
  submit.innerHTML="Submit";
  submit.setAttribute("id","submit");
  submit.setAttribute("style","height:30px; width:100px;color:white; background-color:black; font-size: 12px; border:none; margin-left:10px; ");

  listdiv1.append(label1);
  listdiv1.append(label2);
  listdiv1.append(label3);
  listdiv1.append(label4);
  listdiv1.append(label5);
  listdiv1.append(label6);
  listdiv1.append(label7);
  insertBlankLine(listdiv1);

  listdiv1.append(inputAns);
  listdiv1.append(submit);
  insertBlankLine(listdiv1);
  insertBlankLine(listdiv1);
  insertBlankLine(listdiv1);
  showListProducts.appendChild(listdiv1);

submit.addEventListener("click",function()
{
  if(userArray.length==0)
  {
    alert("You need to Login first.");
    location.href="login.html";
  }

  else{
    var target=event.target.parentNode;
    var Answer=inputAns.value;
    if(Answer=="")
    {
      alert("Fill Some Value In It");
    }
    else
    {
     var flag=validate(Answer);
     if(flag==true)
     {
       var AnsObj={
        uid:userArray[userArray.length-1].username,
        qid:newObj.Quesid,
        Quesname:QuesName,
        Quesdesc:QuesDesc,
        option1:opt1,
        option2:opt2,
        option3:opt3,
        option4:opt4,
        marks:Marks,
        answer:Answer
      }
      console.log(AnsObj);
      console.log(AnsObj.marks+":::ansobj");
      
     
    var temp = checkIndex(ansArray,AnsObj.qid,userArray[userArray.length-1].username);
    console.log(userArray);
    if(temp != -1)
    {
      ansArray.splice(temp,1,AnsObj);
      alert("Answer Updated...");
      console.log(ansArray);
      updateCart(AnsObj);
    }
    else if(temp == -1)
    {
      alert("Submitted...");
      ansArray.push(AnsObj);
      ansId++;
      console.log(ansArray);
      storeProducts(ansArray);
    }
  }
}
}
});

}


function getCartProducts()
{
  console.log("get stored product running");
  

  var xhttp=new XMLHttpRequest();
     
      xhttp.onreadystatechange=()=>{
      if(xhttp.readyState == 4 && xhttp.status == 200){
         
        console.log("response text");
        //console.log(xhttp.responseText);
       ansArray= JSON.parse(xhttp.responseText);
      }
    }
    xhttp.open("GET", "/ansarray", true);
    xhttp.send();  
}

function getStoredProducts()
{
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
      console.log("response text");
      //console.log(xhttp.responseText);
      retrievedArray = JSON.parse(xhttp.responseText);

getDom(retrievedArray,0);
    }
  }
  xhttp.open("GET", "/array", true);
  xhttp.send();  
 
}

var start=0;
function next(){
  
  if(start<retrievedArray.length-2)
  {
    start=start+2;
    console.log("start is----"+start);
    showListProducts.innerHTML="";

  
  getDom(retrievedArray,start);
  }
}

function getDom(retrievedArray,start)
{
  
  for(var i=start;i<start+2;i++)
  {
    if(i<=retrievedArray.length-1)
    addProducttoDOM(retrievedArray[i]);
  }
}

function back(){

 if(start>=2)
 { 
   start=start-2;
   showListProducts.innerHTML="";
   console.log("back start is......."+start);
   backDom(retrievedArray,start);
 }
}

function backDom(retrievedArray,start){
  for(var i=start;i<start+2;i++){

    addProducttoDOM(retrievedArray[i]);
  }
}
 


function getSessionProducts()
{
 
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
      console.log("response text for login array-----------");
      //console.log(xhttp.responseText);
      userArray = JSON.parse(xhttp.responseText);
      
  if(userArray.length!=0)
{
  console.log("loggedin is calling---------");
loggedIn();

}
     
    }
   }

  xhttp.open("GET", "/loginarray", true);
  xhttp.send();  
}


function insertBlankLine(divi)
{
  var br=document.createElement("br");
  divi.appendChild(br);
}



function validate(enteredans)
{
 if(parseInt(enteredans)<=0 || parseInt(enteredans)>4)
  {
    alert("Invalid Answer, Enter as 1,2,3,4");
    return false;
  }
  
  return true;
}


function checkIndex(ansArray,id,username)
{
  console.log("username "+username+" id "+id);
  for(var i=0;i<ansArray.length;i++)
  {
    if(ansArray[i].uid==username && ansArray[i].qid == id)
    {
      console.log(ansArray[i].uid+" "+ansArray[i].qid+" "+id)
      return i;
    }
  }
  return -1;
}


function storeProducts(ansArray)
{

  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/ansarray", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("productList="+JSON.stringify(ansArray));

}


var sum=0;
function check()
{
    location.href="CartProducts.html";
    
}


function getProductIndex(id)
{
  for(var i=0;i<retrievedArray.length;i++)
  {
    if(retrievedArray[i].Prodid==id)
    return i;
  }
  return 0;
}

var logInArray=[];


function loggedIn()
{
  Name.innerHTML="✔"+userArray[userArray.length-1].username;
  Name.setAttribute("href","#");
  Logout.innerHTML="Logout";
  Logout.addEventListener("click",function(){

setSession("logout");

  
  });
 
}

function setSession(username){

  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/setSession", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("username="+JSON.stringify(username));
}


function checkUser(username)
{
  for(var i=0;i<CartArray.length;i++)
  {
    if(CartArray[i].UserId==username)
    {
      return true;
    }
  }
  return false;
}

function updateCart(obj){

  console.log("update cart working");
  console.log(obj);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   
  }
};
xhttp.open("POST", "/ansupdate", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhttp.send("obj="+JSON.stringify(obj));
}