console.log('Todos Script Connected!')

const form = document.querySelector('#add-todo'); 
const input = document.querySelector('#todo'); 
const todoList = document.querySelector('#todo-list'); 
// Retrieve from local storage
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
  console.log(`The event target tag is: ${event.target.tagName}`)
  // let buttonSibling = e.target.previousSibling;
  // console.log(`The button was associated with: ${buttonSibling.innerText}`)
  // ********** Use buttonSibling.innerText === task to remove from local storage
  let clickedListItem = event.target;

  // if (e.target.tagName === 'BUTTON'){
  //   e.target.parentElement.remove();

  // } 
  
  if (e.target.tagName === 'SPAN'){
    e.target.classList.toggle('completed')
    if (e.target.isCompleted === true){
      e.target.isCompleted = false;
    } else {
      e.target.isCompleted = true;
    }
  }

  for (let i = 0; i < savedTodos.length; i++) {
    if (savedTodos[i].task === clickedListItem.innerText) {
      savedTodos[i].isCompleted = clickedListItem.isCompleted;
      localStorage.setItem("todos", JSON.stringify(savedTodos));
    }
  }

})



form.addEventListener('submit', function(e){
  e.preventDefault();
  console.log(input.value)
  const newTodo = document.createElement('li'); // new Todo
  // Use span for Todo
  const newTodoSpan = document.createElement('span'); // Span
  newTodoSpan.innerText = `${input.value} `;
  const todoId = Date.now().toString();

  const removeBtn = document.createElement('button');

  newTodoSpan.isCompleted = false; // for local storage
  removeBtn.innerText = 'Remove Todo';
  removeBtn.classList.add('remove-btn')
  input.value = '';
  todoList.appendChild(newTodo);
  newTodo.appendChild(newTodoSpan)
  newTodo.appendChild(removeBtn)


  // Save to local storage
  savedTodos.push({ task: newTodoSpan.innerText, isCompleted: false, id: todoId});
  localStorage.setItem('todos', JSON.stringify(savedTodos)); 

})






