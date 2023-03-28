let myForm = document.getElementById('myform');
let candy_name= document.getElementById('expanse')
let description= document.getElementById('descriptionInput')
let category= document.getElementById('category')
let quantity= document.getElementById('quantity')
let expanseId= document.getElementById('expanseId');
const userList = document.getElementById('displayList');
var a=0;

const url= "http://localhost:3000";


myForm.addEventListener('submit',add);
userList.addEventListener('click',remove);
userList.addEventListener('click',edit);


window.addEventListener('DOMContentLoaded',()=>{  
axios.get(url+'/getExpenses') 
.then(res=>{
  console.log('<lodingExpenses>',res);
  displayExpanses(res.expanses);
}).catch(err=>{console.log("error found"); console.log(err)});  
});


async function add(e){
try{
e.preventDefault();
if(description.value===''||quantity.value===''){ alert('please enter all fields')}
else{
   
  let obj={"candy_name":candy_name.value,"quantity":quantity.value, "category":category.value,"description": description.value}
  if (a==0){
    let res=await axios.post(url+'/addExpenses',obj)
    console.log('<sqlNewDataRecieved>',res)
  }
  else{
    let res=await axios.put(url+'/updateExpense'+'/'+expanseId.value,obj)
    console.log('<updatedExpanseRecieved>',res)
  }
  let res =await axios.get(url+'/getExpenses')
  a=0;
  console.log('<gettingAllExpenses>',res)
  displayExpanses(res.expanses)
}
}
catch(err){console.log(err)};  
}



function displayExpanses(data){
let ul = document.getElementById('displayList')
while (userList.firstChild) {
  userList.removeChild(userList.lastChild);
  }
for (let i = 0; i < data.length  ; i++){
  
    let destring=data[i];

let li= document.createElement('li');
li.id=destring.id;
li.appendChild(document.createTextNode(destring.candy_name + ': ' ))
li.appendChild(document.createTextNode(destring.quantity + ': ' ))
li.appendChild(document.createTextNode(destring.category+ " - "))
li.appendChild(document.createTextNode(destring.description))


let delbtn = document.createElement('button');
delbtn.className='delete'
delbtn.appendChild(document.createTextNode('DEL_EXP'))
li.appendChild(delbtn)
let editbtn = document.createElement('button');
editbtn.className='edit'
editbtn.appendChild(document.createTextNode('EDIT_EXP'))
li.appendChild(editbtn)
userList.appendChild(li);

expanse.value=''
description.value=''

}
};
async function remove(e){
try{
  if(e.target.classList.contains('delete')){
     var li= e.target.parentElement;
     let key = li.id;
     console.log(key);
     let re =await axios.delete(url+'/deleteExpenses'+key)
     console.log('<deletedExpense>',re);
     let res=await axios.get(url+'/getExpenses')
     displayExpanses(res.expanses);
  } 
  }catch(err){console.log(err)}
  }
async function edit(e){
  try{
  a=1
  if(e.target.classList.contains('edit')){
  let li= e.target.parentElement;
  let key = li.id;
  console.log(key);
  let res=await axios.get(url+'/getExpense'+'/'+key)
  console.log('<getOldExpanse>',res);
  candy_name.value=res.expanse.candy_name;

  quantity.value=res.expanse.quantity;
  description.value=res.expanse.description; 
  category.value= res.expanse.category
  expanseId.value=res.expanse.id
  }
  }
  catch(err){console.log(err)}
}
  
