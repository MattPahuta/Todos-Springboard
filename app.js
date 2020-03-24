console.log('Todos Script Connected!')

const form = document.querySelector('#add-todo'); // was #add-friend
const input = document.querySelector('#todo'); // was #first-name
const todoList = document.querySelector('#todo-list'); // Todo UL, was #friendList

// Add event listener to entire UL (friendList)
todoList.addEventListener('click', function(e){
  console.log(event.target.tagName)
  if (e.target.tagName === 'BUTTON'){
    e.target.parentElement.remove();
  }
  else if (e.target.tagName === 'LI'){
    e.target.classList.toggle('completed')
  }
})

form.addEventListener('submit', function(e){
  e.preventDefault();
  console.log(input.value)
  const newTodo = document.createElement('li'); // newFriend = newTodo
  const doneBtn = document.createElement('button');
  newTodo.innerText = `${input.value} `;
  doneBtn.innerText = 'Done!';
  input.value = '';
  todoList.appendChild(newTodo);
  newTodo.appendChild(doneBtn)
  doneBtn.classList.add('done-btn');
})


