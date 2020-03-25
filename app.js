console.log('Todos Script Connected!')

const form = document.querySelector('#add-todo'); 
const input = document.querySelector('#todo'); // Add todo input
const todoList = document.querySelector('#todo-list'); 
const savedTodos = JSON.parse(localStorage.getItem('todos')) || []

// Populate Todo list from savedTodos
for (let i=0; i<savedTodos.length; i++){
  let newTodo = document.createElement('li')
  let newTodoSpan = document.createElement('span');
  let removeBtn = document.createElement('button');
  removeBtn.innerText = 'Remove Todo';
  removeBtn.classList.add('remove-btn')
  newTodoSpan.innerText = savedTodos[i].task;
  newTodoSpan.isCompleted = savedTodos[i].isCompleted ? true : false;
  if (newTodoSpan.isCompleted) {
    newTodoSpan.classList.add('completed');
  }
  todoList.appendChild(newTodo);
  newTodo.appendChild(newTodoSpan);
  newTodo.appendChild(removeBtn);
}

// Add event listener to entire Todo UL
todoList.addEventListener('click', function(e){
  // console.log(`The event target tag is: ${event.target.tagName}`)
  let clickedListItem = event.target;
  // Delete Todo LI from list and local storage
  if (e.target.tagName === 'BUTTON'){
    // loop through the localstorage array
    for (let i=0; i<savedTodos.length; i++){
      // check if savedTodo task matches the innerText of the previousSibling (<span>) of the button clicked
      if (savedTodos[i].task === e.target.previousSibling.innerText) {
        savedTodos.splice(i,1);
        e.target.parentElement.remove();
        localStorage.setItem('todos', JSON.stringify(savedTodos));
      }
    }

  } 
  // Toggle the completed css class
  if (e.target.tagName === 'SPAN'){
    e.target.classList.toggle('completed')
    if (e.target.isCompleted === true){
      e.target.isCompleted = false;
    } else {
      e.target.isCompleted = true;
    }
  }
  // Toggle the isCompleted flag
  for (let i = 0; i < savedTodos.length; i++) {
    if (savedTodos[i].task === clickedListItem.innerText) {
      savedTodos[i].isCompleted = clickedListItem.isCompleted;
      localStorage.setItem("todos", JSON.stringify(savedTodos));
    }
  }

})


// Add New Todos
form.addEventListener('submit', function(e){
  e.preventDefault();
  const newTodo = document.createElement('li'); // new Todo li
  const newTodoSpan = document.createElement('span'); // new Todo span
  newTodoSpan.innerText = `${input.value} `;
  newTodoSpan.isCompleted = false; // for local storage
  const removeBtn = document.createElement('button'); // new remove Todo button
  removeBtn.innerText = 'Remove Todo';
  removeBtn.classList.add('remove-btn')
  input.value = '';
  todoList.appendChild(newTodo);
  newTodo.appendChild(newTodoSpan)
  newTodo.appendChild(removeBtn)
  // Save to local storage
  savedTodos.push({ task: newTodoSpan.innerText, isCompleted: false});
  localStorage.setItem('todos', JSON.stringify(savedTodos)); 

})

