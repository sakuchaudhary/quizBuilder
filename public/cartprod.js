var ansArray=[];
var cartId=0;
var retrieved=[];
var userArray=[];
var loginarray=[];

var cartProducts=document.getElementById("CartProducts");

var flag=0;
function addProducttoDOM(newObj,corrans)
{
  var listdiv1=document.createElement("div");
  listdiv1.setAttribute("id",newObj.qid);
  var QuesName=newObj.Quesname;
  var QuesDesc=newObj.Quesdesc;
  var opt1=newObj.option1;
  var opt2=newObj.option2;
  var opt3=newObj.option3;
  var opt4=newObj.option4;
  var ans=newObj.answer;
 
  var label1=document.createElement("LABEL");
  var label2=document.createElement("LABEL");
  var label3=document.createElement("LABEL");
  var label4=document.createElement("LABEL");
  var label5=document.createElement("LABEL");
  var label6=document.createElement("LABEL");
  var label7=document.createElement("h4");
  var label8=document.createElement("h3");
  
  label1.innerHTML="Question Name: "+QuesName;
  label2.innerHTML="Question Desc: "+QuesDesc;
  label3.innerHTML="Option1: "+opt1;
  label4.innerHTML="Option2: "+opt2;
  label5.innerHTML="Option3: "+opt3;
  label6.innerHTML="Option4: "+opt4;
  label7.innerHTML="Your Answer: "+ans;
  label8.innerHTML="Correct Answer: "+corrans;
 // label9.innerHTML="Marks: "+marks;

  label1.setAttribute("style","font-size:1.5em; font-Family:sans-serif; margin-left:15px;");
  label2.setAttribute("style","font-size:1.5em; font-Family:sans-serif; margin-left:15px;");
  label3.setAttribute("style","font-size:1.5em; font-Family:sans-serif; margin-left:15px;");
  label4.setAttribute("style","font-size:1.5em; font-Family:sans-serif; margin-left:15px;");
  label5.setAttribute("style","font-size:1.5em; font-Family:sans-serif; margin-left:15px;");
  label6.setAttribute("style","font-size:1.5em; font-Family:sans-serif; margin-left:15px;");
  label7.setAttribute("style","font-size:1.5em; font-Family:sans-serif; margin-left:15px;");
  label8.setAttribute("style","font-size:1.5em; font-Family:sans-serif; margin-left:15px;");
  
  listdiv1.append(label1);
  insertBlankLine(listdiv1);
  listdiv1.append(label2);
  insertBlankLine(listdiv1);
  listdiv1.append(label3);
  insertBlankLine(listdiv1);
  listdiv1.append(label4);
  insertBlankLine(listdiv1);
  listdiv1.append(label5);
  insertBlankLine(listdiv1);
  listdiv1.append(label6);
  insertBlankLine(listdiv1);
  listdiv1.append(label7);
  listdiv1.append(label8);
  insertBlankLine(listdiv1); 
  listdiv1.setAttribute("style","border:ridge");
  cartProducts.append(listdiv1);

}

var activeUser="";
function getStoredProducts()
{

  console.log("get stored product running");
  
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
      console.log("response text");
      console.log(xhttp.responseText);
      ansArray = JSON.parse(xhttp.responseText);
     
     activeUser=loginarray[loginarray.length-1].username;

    for(var i=0;i<ansArray.length;i++)
    {
      for(var j=0;j<retrieved.length;j++)
      {
        if(ansArray[i].uid==activeUser && ansArray[i].qid==retrieved[j].Quesid)
        addProducttoDOM(ansArray[i],retrieved[j].answer);
      }
    //console.log(findId);
  }
  totalmarks(ansArray);
    }
  }
  xhttp.open("GET", "/ansarray", true);
  xhttp.send();  
 
}

function insertBlankLine(divi)
{
  var br=document.createElement("br");
  divi.appendChild(br);
}


function getSessionProducts()
{
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
      console.log("response text for login array-----------");
      //console.log(xhttp.responseText);
      userArray = JSON.parse(xhttp.responseText);
    }
   }

  xhttp.open("GET", "/loginarray", true);
  xhttp.send();  
}

var sum=0;
function totalmarks(ansArray)
{
  if(ansArray.length==0)
  alert("Add your answer");
  else
  {
    var max=retrieved.length*5;
    for(var i=0;i<ansArray.length;i++)
    {
      for(var j=0;j<retrieved.length;j++)
      {
        if(ansArray[i].qid==retrieved[j].Quesid && ansArray[i].answer == retrieved[j].answer)
        {
          var s=JSON.parse(retrieved[j].marks);
          sum+=s;
         
        }
      }
    }
   }
   //alert(sum);
  var label=document.getElementById("total");
  label.innerHTML="Total Marks: "+sum+"/"+max;
}



function getretrivedProducts(){
var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
       
      console.log("response text");
      console.log(xhttp.responseText);
     retrieved = JSON.parse(xhttp.responseText);
     
    }
  }
  xhttp.open("GET", "/array", true);
  xhttp.send(); 
}


function getloginarray(){
  console.log("get stored product running");
  

  var xhttp=new XMLHttpRequest();
     
      xhttp.onreadystatechange=()=>{
      if(xhttp.readyState == 4 && xhttp.status == 200){
         
        console.log("response text");
        console.log(xhttp.responseText);
       loginarray = JSON.parse(xhttp.responseText);
       
      }
    }
    xhttp.open("GET", "/loginarray", true);
    xhttp.send();  
   
  
}
function deleteall()
{
  emptyCart(activeUser);
  location.href="login.html";
}
function emptyCart(username)
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   
  }
};
xhttp.open("POST", "/emptyans", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhttp.send("username="+JSON.stringify(username));
}