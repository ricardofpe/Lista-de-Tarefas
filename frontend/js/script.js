const tbody = document.querySelector('tbody');
const form = document.querySelector('.form-adicionar');
const input = document.querySelector('.input-adicionar')

const foundTasks = async () => {
  const res = await fetch('http://localhost:3333/tasks');
  const tasks = await res.json()

return tasks;


}

const addTask = async (event) => {
event.preventDefault();

const task = {title:input.value}

await fetch('http://localhost:3333/tasks', {
  method : 'post', 
  headers: {'Content-Type' : 'application/json'},
  body: JSON.stringify(task),
});


loadTask();
input.value = '';

}

const deleteTask = async (id) =>{

  await fetch(`http://localhost:3333/tasks/${id}`, {
    method:'delete',
  });

  loadTask();

}

const formatDate = (dateUTC) => {
  const options = { dateStyle: 'long', timeStyle: 'short' };
  const date = new Date(dateUTC).toLocaleString('pt-br', options);
  return date;
}



const createElement = (tag, innerText = '', innerHTML = '') => {
 
  const element = document.createElement(tag)
  if (innerText){
    element.innerText = innerText;
  }

  if (innerHTML){
    element.innerHTML = innerHTML;
  }

  return element
}

const createSelect = (value) => {

  const options = `
  <option value="pendente">pendente</option>
  <option value="em curso">em curso</option>
  <option value="concluída">concluída</option>`;

  const select = createElement('select', '', options);

  select.value = value;
  return select;
}

const task = {

}

const createTask = (task) => {

  const{id, title, created_at, status} = task;

  const tr = createElement('tr')
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td' , formatDate( created_at));
  const tdStatus = createElement('td');
  const tdActions = createElement('td');

  const select = createSelect(status);

const editButton = createElement('button', '','<span class="material-symbols-outlined">edit</span>' )
const deleteButton = createElement('button', '','<span class="material-symbols-outlined">delete</span>' )



editButton.classList.add('botao-acao');
deleteButton.classList.add('botao-acao');

deleteButton.addEventListener('click' ,() =>deleteTask(id));

tdStatus.appendChild(select);

tdActions.appendChild(editButton);
tdActions.appendChild(deleteButton);

tr.appendChild(tdTitle);
tr.appendChild(tdCreatedAt);
tr.appendChild(tdStatus);
tr.appendChild(tdActions);


return tr;
}


const loadTask = async () => {
  const tasks = await foundTasks();

  tbody.innerHTML = '';
  tasks.forEach((task) =>{
const tr = createTask(task);
tbody.appendChild(tr)
  });
}


form.addEventListener('submit', addTask);
loadTask();