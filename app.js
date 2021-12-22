const firebaseConfig = {
    apiKey: "AIzaSyAhCTpRKXYIznHFekk10VuX875mh2IYufE",
    authDomain: "todo-bmj-firebase.firebaseapp.com",
    databaseURL: "https://todo-bmj-firebase-default-rtdb.firebaseio.com",
    projectId: "todo-bmj-firebase",
    storageBucket: "todo-bmj-firebase.appspot.com",
    messagingSenderId: "755305452637",
    appId: "1:755305452637:web:df528e0cce3b9ab099a9b4"
  };

  var app = firebase.initializeApp(firebaseConfig);

var listBox = document.getElementById('listBox')

function addTodo(){
   var val = document.getElementById('todo').value;
var obj={
    values:val,
    edit:false
}
   app.database().ref('/').child('todos').push(obj)
   .then(function(success){
console.log(success,'success')
   })
   .catch(function(err){
console.log(err,'err')
   })
}

app.database().ref('/todos').on("child_added",function(data){
console.log(data.val(),data.key)

///Created li Element and text node of value 
var li = document.createElement("li");
var liTxt = document.createTextNode(data.val().values);
li.appendChild(liTxt);


//created Edit BTn
var editBtn = document.createElement("button")
var editBtnTxt = document.createTextNode("EDIT");
editBtn.setAttribute("onclick", "editList(this)");
editBtn.setAttribute("id" , data.key)
editBtn.appendChild(editBtnTxt)
li.appendChild(editBtn)


var delBtn = document.createElement("button")
var delBtnTxt = document.createTextNode("DEL")
delBtn.setAttribute("onclick", "delList(this)")
delBtn.setAttribute("id" , data.key)
delBtn.appendChild(delBtnTxt)
li.appendChild(delBtn)
listBox.appendChild(li)
})


function delAll(){
    listBox.innerHTML = ""
    app.database().ref("/todos").remove()

}

function editList(e){
    var litxt = e.parentNode.firstChild.nodeValue
console.log(litxt,'litxt');
var editLiTxt = prompt("EDIT TODO" , litxt )
console.log(editLiTxt);
e.parentNode.firstChild.nodeValue = editLiTxt;
console.log(e.id,'e.id')
// app.database().ref(`/todos/${e.id}`).set({values:editLiTxt})
app.database().ref(`/todos/${e.id}`).update({values:editLiTxt})
.then(function(success){
    console.log(success,'success')
       })
       .catch(function(err){
    console.log(err,'err')
       })
}
function delList(e){
    console.log(e.parentNode)
    e.parentNode.remove()
    // console.log(e.id)
    app.database().ref("todos").child(e.id).remove()
}