var QuesArray=[];
var QuesId=0;
var currentId=0;
var temp=1;
var targetParent;
var editParent;
var divAddProduct = document.getElementById("divAddProduct");
var divListProducts = document.getElementById("divListProducts");
var aAddProduct = document.getElementById("aAddProduct");

aAddProduct.addEventListener("click",function(){
  createNewProductPanel();
  aAddProduct.setAttribute("style","visibility:hidden");
});

function createNewProductPanel()
{
  if(temp==1)
  {
  temp=0;

  var h2=document.createElement("h2");
  h2.setAttribute("id","h2");
  h2.innerHTML="Add Questions";
  h2.setAttribute("style","text-decoration:underline");
   

  var div1=document.createElement("div");
  div1.setAttribute("id","div1");
  var QuesName=document.createElement("input");
  QuesName.setAttribute("id","QuesName");
  QuesName.setAttribute("placeholder","Question Name....");
 
  
  div1.appendChild(QuesName);
  insertBlankLine(div1);
  insertBlankLine(div1);


  var div2=document.createElement("div");
  div2.setAttribute("id","div2");
  var QuesDesc=document.createElement("textarea");
  QuesDesc.setAttribute("id","QuesDesc");
  QuesDesc.setAttribute("placeholder","Question Desc....");
  QuesDesc.setAttribute("rows","4");
  QuesDesc.setAttribute("cols","19");
  div2.appendChild(QuesDesc);
  insertBlankLine(div2);
  insertBlankLine(div2);

  
  var div3=document.createElement("div");
  div3.setAttribute("id","div3");
  var opt1=document.createElement("input");
  opt1.setAttribute("id","opt1");
  opt1.setAttribute("placeholder","option1....");
 
  
  div3.appendChild(opt1);
  insertBlankLine(div3);
  insertBlankLine(div3);

  var div4=document.createElement("div");
  div4.setAttribute("id","div4");
  var opt2=document.createElement("input");
  opt2.setAttribute("id","opt2");
  opt2.setAttribute("placeholder","option2....");
 
  
  div4.appendChild(opt2);
  insertBlankLine(div4);
  insertBlankLine(div4);

  var div5=document.createElement("div");
  div5.setAttribute("id","div5");
  var opt3=document.createElement("input");
  opt3.setAttribute("id","opt3");
  opt3.setAttribute("placeholder","option3....");
 
  
  div5.appendChild(opt3);
  insertBlankLine(div5);
  insertBlankLine(div5);

  var div6=document.createElement("div");
  div6.setAttribute("id","div6");
  var opt4=document.createElement("input");
  opt4.setAttribute("id","opt4");
  opt4.setAttribute("placeholder","option4....");
 
  
  div6.appendChild(opt4);
  insertBlankLine(div6);
  insertBlankLine(div6);

  var div7=document.createElement("div");
  div7.setAttribute("id","div7");
  var ans=document.createElement("input");
  ans.setAttribute("id","ans");
  ans.setAttribute("placeholder","answer....");
 
  
  div7.appendChild(ans);
  insertBlankLine(div7);
  insertBlankLine(div7);

  var div8=document.createElement("div");
  div8.setAttribute("id","div8");
  var marks=document.createElement("input");
  marks.setAttribute("id","marks");
  marks.setAttribute("placeholder","marks....");
 
  
  div8.appendChild(marks);
  insertBlankLine(div8);
  insertBlankLine(div8);

var div9=document.createElement("div");
div9.setAttribute("id","div9");
var submitButton=document.createElement("button");
submitButton.setAttribute("id","submitButton");
submitButton.setAttribute("style","margin-left:5px");
submitButton.innerHTML="Submit";
submitButton.addEventListener("click",function()
{
  var flag=validation();
  if(flag==true){
  addProducttoArray();
   }
   else
   alert("All fields required......");
});

var cancelButton=document.createElement("button");
cancelButton.setAttribute("id","cancelButton");
cancelButton.setAttribute("style","margin-left:20px");
cancelButton.innerHTML="Cancel";
cancelButton.addEventListener("click",function(){
//removeFields();
});

var saveButton=document.createElement("button");
saveButton.setAttribute("id","saveButton");
saveButton.setAttribute("style","margin-left:20px");
saveButton.setAttribute("style","visibility:hidden");
saveButton.addEventListener("click",function(){
var newObject={
  Quesid:currentId,
  Quesname:document.getElementById("QuesName").value,
  Quesdesc:document.getElementById("QuesDesc").value,
  option1:document.getElementById("opt1").value,
  option2:document.getElementById("opt2").value,
  option3:document.getElementById("opt3").value,
  option4:document.getElementById("opt4").value,
  answer:document.getElementById("ans").value,
  marks:document.getElementById("marks").value
}
replaceInArray(newObject);
updateDom(newObject);
clearPannel();
});
saveButton.innerHTML="Save";
div9.append(submitButton);
div9.append(cancelButton);
div9.append(saveButton);

divAddProduct.append(h2);
divAddProduct.append(div1);
divAddProduct.append(div2);
divAddProduct.append(div3);
divAddProduct.append(div4);
divAddProduct.append(div5);
divAddProduct.append(div6);
divAddProduct.append(div7);
divAddProduct.append(div8);
divAddProduct.append(div9);
}
}

function insertBlankLine(divi)
{
  var br=document.createElement("br");
  divi.appendChild(br);
}

//******************************validation function*********************************** */
function validation()
{
  var QuesName=document.getElementById("QuesName").value;
  var QuesDesc=document.getElementById("QuesDesc").value;
  var opt1=document.getElementById("opt1").value;
  var opt2=document.getElementById("opt2").value;
  var opt3=document.getElementById("opt3").value;
  var opt4=document.getElementById("opt4").value;
  var ans=document.getElementById("ans").value;
  var marks=document.getElementById("marks").value;
 
  if(QuesName == ""||QuesDesc == ""||opt1 == ""||opt2==""||opt3 == ""||opt4==""||ans==""||marks==""){
  return false;}
  else
  return true;
}

//****************add to product array function*********************** */
function addProducttoArray()
{
  var QuesObject={
  Quesid:QuesId,
  Quesname:document.getElementById("QuesName").value,
  Quesdesc:document.getElementById("QuesDesc").value,
  option1:document.getElementById("opt1").value,
  option2:document.getElementById("opt2").value,
  option3:document.getElementById("opt3").value,
  option4:document.getElementById("opt4").value,
  answer:document.getElementById("ans").value,
  marks:document.getElementById("marks").value
  }
  QuesArray.push(QuesObject);
  storeProducts(QuesArray);

 addProducttoDOM(QuesObject,1);

  clearPannel();
  QuesId++;
  console.log(JSON.stringify(QuesArray));
}


//*********add to DOM function******************* */
function addProducttoDOM(ProdObj,flag2)
{
var listdiv1=document.createElement("div");
var QuesName=ProdObj.Quesname;
var QuesDesc=ProdObj.Quesdesc;
var opt1=ProdObj.option1;
var opt2=ProdObj.option2;
var opt3=ProdObj.option3;
var opt4=ProdObj.option4;
var mark=ProdObj.marks;
var ans=ProdObj.answer;
var quesid=ProdObj.Quesid;
 if(flag2==1)
 quesid=quesid+1;

var Qname=document.createElement("h4");
var Qdesc=document.createElement("h4");
var Opt1=document.createElement("h4");
var Opt2=document.createElement("h4");
var Opt3=document.createElement("h4");
var Opt4=document.createElement("h4");
var Marks=document.createElement("h3");
var Ans=document.createElement("h2");

Qname.innerHTML=quesid+": Question Name: "+QuesName;
Qdesc.innerHTML="Question Description: "+QuesDesc;
Opt1.innerHTML="Option1: "+opt1;
Opt2.innerHTML="OPtion2: "+opt2;
Opt3.innerHTML="Option3: "+opt3;
Opt4.innerHTML="Option4: "+opt4;
Marks.innerHTML="Marks: "+mark;
Ans.innerHTML="Answer: "+ans;

var editButton=document.createElement("button");
editButton.setAttribute("id","editButton");
editButton.setAttribute("style","margin-left:3px");
editButton.setAttribute("style","margin-top:5px");
editButton.innerHTML="Edit";

var deleteButton=document.createElement("button");
deleteButton.setAttribute("id","deleteButton");
deleteButton.setAttribute("style","margin-top:5px");
deleteButton.setAttribute("style","margin-left:10px");
deleteButton.innerHTML="Delete";

listdiv1.append(Qname);

listdiv1.append(Qdesc);

listdiv1.append(Opt1);

listdiv1.append(Opt2);
listdiv1.append(Opt3);

listdiv1.append(Opt4);

listdiv1.append(Marks);
listdiv1.append(Ans);

insertBlankLine(listdiv1);
listdiv1.append(editButton);
listdiv1.append(deleteButton);



insertBlankLine(listdiv1);
insertBlankLine(listdiv1);
divListProducts.append(listdiv1);
console.log(QuesArray);

editButton.addEventListener("click",function(){
editFunction(QuesName,QuesDesc,opt1,opt2,opt3,opt4,mark,ans,ProdObj);
});

deleteButton.addEventListener("click",function(){
  
  deleteFunction(ProdObj);
 
});
}

//******clear pannel function*************** */
function clearPannel()
{
temp=1;
divAddProduct.removeChild(h2);
divAddProduct.removeChild(div1);
divAddProduct.removeChild(div2);
divAddProduct.removeChild(div3);
divAddProduct.removeChild(div4);
divAddProduct.removeChild(div5);
divAddProduct.removeChild(div6);
divAddProduct.removeChild(div7);
divAddProduct.removeChild(div8);
divAddProduct.removeChild(div9);

aAddProduct.setAttribute("style","visibility:visible; inline-size: 200px; margin-left: 40%;");
}


//************removing object from array*************** */
function removeFromProductsArray(id)
{
  console.log(id+"deleted");
  QuesArray.splice(id,1);
  console.log(QuesArray);
 
}

//*******************insert into fields during edit function*********** */

function insertIntoFields(QuesName,QuesDesc,opt1,opt2,opt3,opt4,ans,marks)
{
  var name=document.getElementById("QuesName");
  var desc=document.getElementById("QuesDesc");
  var option1=document.getElementById("opt1");
  var option2=document.getElementById("opt2");
  var option3=document.getElementById("opt3");
  var option4=document.getElementById("opt4");
  var Marks=document.getElementById("marks");
  var Answer=document.getElementById("ans");

  name.value=QuesName;
  desc.value=QuesDesc;
  option1.value=opt1;
  option2.value=opt2;
  option3.value=opt3;
  option4.value=opt4;
  Answer.value=ans;
  Marks.value=marks;
}


function updateDom(ProdObj)
{
 var listdiv1=document.createElement("div");
var QuesName=ProdObj.Quesname;
var QuesDesc=ProdObj.Quesdesc;
var Option1=ProdObj.option1;
var Option2=ProdObj.option2;
var Option3=ProdObj.option3;
var Option4=ProdObj.option4;
var Marks=ProdObj.marks;
var Answer=ProdObj.answer;
var quesid=ProdObj.Quesid;

var Qname=document.createElement("h4");
var Qdesc=document.createElement("h4");
var opt1=document.createElement("h4");
var opt2=document.createElement("h4");
var opt3=document.createElement("h4");
var opt4=document.createElement("h4");
var ans=document.createElement("h2");
var marks=document.createElement("h3");

Qname.innerHTML=quesid+": Question Name: "+QuesName;
Qdesc.innerHTML="Question Description: "+QuesDesc;
opt1.innerHTML="Option1: "+Option1;
opt2.innerHTML="Option2: "+Option2;
opt3.innerHTML="Option3: "+Option3;
opt4.innerHTML="Option4: "+Option4;
ans.innerHTML="Answer: "+Answer;
marks.innerHTML="Marks: "+Marks;

var editButton=document.createElement("button");
editButton.setAttribute("id","editButton");
editButton.setAttribute("style","margin-left:3px");
editButton.setAttribute("style","margin-top:5px");
editButton.innerHTML="Edit";

var deleteButton=document.createElement("button");
deleteButton.setAttribute("id","deleteButton");
deleteButton.setAttribute("style","margin-top:5px");
deleteButton.setAttribute("style","margin-left:10px");
deleteButton.innerHTML="Delete";

listdiv1.append(Qname);

listdiv1.append(Qdesc);

listdiv1.append(opt1);

listdiv1.append(opt2);

listdiv1.append(opt3);

listdiv1.append(opt4);
listdiv1.append(marks);
listdiv1.append(ans);

insertBlankLine(listdiv1);

listdiv1.append(editButton);
listdiv1.append(deleteButton);

insertBlankLine(listdiv1);
insertBlankLine(listdiv1);
divListProducts.append(listdiv1);
 editParent.parentNode.replaceChild(listdiv1,editParent);
  editButton.addEventListener("click",function(){
  editFunction(QuesName,QuesDesc,Option1,Option2,Option3,Option4,Marks,Answer,ProdObj);
  });
  deleteButton.addEventListener("click",function(){
  deleteFunction(ProdObj);
  
  });
}


function getProductIndex(id)
{
  for (var i = 0; i < QuesArray.length; i++)
	{
      if (QuesArray[i].Quesid == id)
			return i;
  }
}


function replaceInArray(newObj)
{
  for(var i=0;i<QuesArray.length;i++)
  {
    if(QuesArray[i].QuesName==newObj.QuesName)
    {
      QuesArray[i]=newObj;
    }
  }
  console.log(QuesArray);
  
  updateDatabase(newObj);
}


function storeProducts(QuesArray)
{
var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   
    }
  };
  xhttp.open("POST", "/array", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("productList="+JSON.stringify(QuesArray));
}

function getStoredProducts()
{

  console.log("get stored product running");
  

var xhttp=new XMLHttpRequest();
   
    xhttp.onreadystatechange=()=>{
    if(xhttp.readyState == 4 && xhttp.status == 200){
      QuesArray = JSON.parse(xhttp.responseText);
    QuesId = QuesArray[QuesArray.length-1].Quesid;
    console.log(QuesArray);
    console.log("-----------------------------")

    console.log("name "+QuesArray[0].name);
        for(i=0;i<QuesArray.length;i++)
        {
        addProducttoDOM(QuesArray[i],0);
        }
    }
  }
  xhttp.open("GET", "/array", true);
  xhttp.send();  
 
}



function editFunction(QuesName,QuesDesc,opt1,opt2,opt3,opt4,ans,marks,ProdObj)
{
  editParent=event.target.parentNode;
  createNewProductPanel();
  aAddProduct.setAttribute("style","visibility:hidden");
  document.getElementById("submitButton").setAttribute("style","visibility:hidden");
  document.getElementById("cancelButton").setAttribute("style","visibility:hidden");
  document.getElementById("saveButton").setAttribute("style","visibility:visible");
  insertIntoFields(QuesName,QuesDesc,opt1,opt2,opt3,opt4,ans,marks);
  currentId=ProdObj.Quesid;
}


function deleteFunction(ProdObj)
{
  targetParent = event.target.parentNode;
  console.log(ProdObj.Quesid);
  removeFromProductsArray(getProductIndex(ProdObj.Quesid));
  deleteFromDataBase(ProdObj.Quesname);
  targetParent.parentNode.removeChild(targetParent);
}

var userArray=[];
function checkLogin()
{
  if(sessionStorage.logarray)
   
  userArray=JSON.parse(sessionStorage.logarray);

  if(userArray.length!=0){
    loggedIn();
  }
  
}

var Name=document.getElementById("name");
var Logout=document.getElementById("logout");

function loggedIn()
{
  Name.innerHTML="Hello "+userArray[0].name+"";
  Name.setAttribute("href","#");
  Logout.innerHTML="Logout";
  Logout.addEventListener("click",function(){
  sessionStorage.logarray=JSON.stringify([]);
  });
 
}

function deleteFromDataBase(Quesname){
  console.log("product to be deleted is with id----"+Quesname)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   
  }
};
xhttp.open("POST", "/delete", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhttp.send("Quesname="+JSON.stringify(Quesname));
}

function updateDatabase(obj){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     
    }
  };
  xhttp.open("POST", "/update", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.send("obj="+JSON.stringify(obj));
}

function logoutadmin()
{
  setSession("logout");
  location.href="login.html";
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
