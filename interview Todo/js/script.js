//Select DOM
const todoInput = document.querySelector(".todo_input");
const todoButton = document.querySelector(".todo_button");
const todoList = document.querySelector(".todo_list");
const todo_length = document.querySelector(".todo_length");

// Dark Mode and Light Mode Script
// Wait for document to load
document.addEventListener("DOMContentLoaded", function(event) {
    document.documentElement.setAttribute("data-theme", "light");
    // Get our button switcher
    let themeSwitcher = document.getElementById("changemode");
    // When our button gets clicked
    themeSwitcher.onclick = function() {
    // Get the current selected theme, on the first run
    // it should be `light`
    let currentTheme = document.documentElement.getAttribute("data-theme");
      // Change Dark/Light mode icons
      if(themeSwitcher.innerHTML == `<img src="images/icon-sun.svg">` ) {
          themeSwitcher.innerHTML= `<img src="images/icon-moon.svg">`;  
      }else{
          themeSwitcher.innerHTML= `<img src="images/icon-sun.svg">`;
      }
    // Switch between `dark` and `light`
    let switchToTheme = currentTheme === "dark" ? "light" : "dark"
    // Set our currenet theme to the new one
    document.documentElement.setAttribute("data-theme", switchToTheme);
    }
  });


// EventListner
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);

function addTodo(e) {
      e.preventDefault();
      let inputvalue = todoInput.value;
      // Checking If input value have only spaces not text
      if (/^\s/.test(inputvalue)){
         inputvalue = "";
      }
      if(!inputvalue == ""){
      //Create list
      const newTodo = document.createElement("li");
      todotext = document.createElement("span")
      todotext.innerText = todoInput.value;
      newTodo.appendChild(todotext)

      newTodo.classList.add("todo_item");
      todoList.appendChild(newTodo);
      todoInput.value = "";
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.classList.add("complete-btn");
        completedButton.addEventListener('click',()=>{
            completedButton.classList.toggle('showbg')
        } )
      newTodo.prepend(completedButton);
      //Create trash button
      const trashButton = document.createElement("button");
      trashButton.classList.add("trash-btn");
      newTodo.appendChild(trashButton);
      //attach final Todo
      let allnewdodo = todoList.childElementCount;
      todo_length.innerText = allnewdodo  + " " +  "items left";

  }else{
      alert("Don't Leave Input Blank")
  }
}

function deleteTodo(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    e.target.parentElement.remove();
    const todo = item.parentElement;
    todo.classList.add("fall");
    // Getting Total TODO
    gettingtotalTodo();
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    // Getting Total TODO
     gettingtotalTodo();
  }

}

let All = document.querySelectorAll('.all_btn');
let completed = document.querySelectorAll('.completed_btn');
let uncompleted = document.querySelectorAll('.uncompleted_btn');
let buttons = document.querySelectorAll('.button_sorts button');
let clear_all_comleted_todo = document.querySelector('.clear_all_comleted_todo');
clear_all_comleted_todo.addEventListener('click', clear_all_com_todo)

let sort_btn_value;

// Clear All completed Todo when User clicked on Remove All completed btn
function clear_all_com_todo() {
  let all_completed_todo = document.querySelectorAll('.todo_item.completed');
    for(let j = 0 ; j < all_completed_todo.length ; j++){
      all_completed_todo[j].classList.add('remove');
    }
}

for(let button = 0; button < buttons.length; button++){
    All[button].addEventListener('click', alltodo);
    completed[button].addEventListener('click', completedtodo);
    uncompleted[button].addEventListener('click', uncompletedtodo);
 
    function alltodo(){
      sort_btn_value = "all";
      filterTodo();
      remove_active();
      All[button].classList.add('active');
    }
    function completedtodo() {
      sort_btn_value = "completed";
      filterTodo();
      remove_active();
      completed[button].classList.add('active');
    }
    function uncompletedtodo(){
      sort_btn_value = "uncompleted";
      filterTodo();
      remove_active();
      uncompleted[button].classList.add('active');
    }
}

// Remove Active class from non active button
function remove_active(){
  for(let a = 0 ; a < buttons.length; a++){
    buttons[a].classList.remove('active');
  }
}
// Getting Total numbers of todo in list
function gettingtotalTodo(){
  let allnewdodo = todoList.childElementCount;
  let all_completed_todo = document.querySelectorAll('.todo_item.completed').length;
  let childtodo = todoList.childElementCount;
  todo_length.innerText = childtodo - all_completed_todo  + " " +  "items left";
}

// Filter the Todo
function filterTodo(e) {
  let allnewdodo = todoList.childElementCount;
  for(let i = 0 ; i < allnewdodo ; i++){
     const todos = todoList.children[i];
     switch (sort_btn_value) {
      case "all":
        todos.style.display = "flex";
        break;
      case "completed":
        if (todos.classList.contains("completed")) {
          todos.style.display = "flex";
        } else {
          todos.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todos.classList.contains("completed")) {
          todos.style.display = "flex";
        } else {
          todos.style.display = "none";
        }
    }
  }
}



