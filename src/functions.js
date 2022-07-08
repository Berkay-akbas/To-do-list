import { taskList } from './index.js'; // eslint-disable-line

export const toggle = (event) => {
  const editInput = document.querySelectorAll('.userTask');
  const item = event.target.closest('li');
  const nodes = Array.from(item.parentNode.children);
  const index = nodes.indexOf(item);
  for (let i = 0; i < editInput.length; i += 1) {
    if (editInput[i].parentNode.parentNode.classList.contains('active')) {
      editInput[i].parentNode.parentNode.classList.toggle('active');
    }
  }
  editInput[index].parentNode.parentNode.classList.toggle('active');
};

export class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
  }
}

export const edit = (event) => {
  const editInput = document.querySelectorAll('.userTask');
  const item = event.target.closest('li');
  const nodes = Array.from(item.parentNode.children);
  const index = nodes.indexOf(item);
  taskList[index].description = editInput[index].value;
  for (let i = 0; i < taskList.length; i += 1) {
    taskList[i].index = i + 1;
  }
  localStorage.setItem('List Storage', JSON.stringify(taskList));
};

export const removeItem = (event) => {
  const item = event.target.closest('li');
  const nodes = Array.from(item.parentNode.children);
  const index = nodes.indexOf(item);
  taskList.splice(index, 1);
  item.remove();
  for (let i = 0; i < taskList.length; i += 1) {
    taskList[i].index = i + 1;
  }
  localStorage.setItem('List Storage', JSON.stringify(taskList));
};

export const populate = () => {
  const taskHolder = document.querySelector('.listholder');
  for (let i = 0; i < taskList.length; i += 1) {
    taskList[i].index = i + 1;
  }
  const listItem = document.createElement('li');
  listItem.classList.add('listitem');
  const a = taskList.slice(-1);
  listItem.innerHTML = `
    <div class="check">
      <input type="checkbox" class="checkbox"/>
      <input type="text" class="userTask" value="${a[0].description}">
      <div class="button-wrapper">
        <i class="fa-solid fa-trash-can"></i>
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>
    </div>
    `;
  taskHolder.appendChild(listItem);
  document.getElementById('text').value = '';
  const removeButton = listItem.querySelector('.fa-trash-can');
  removeButton.addEventListener('click', removeItem);
  const editInput = listItem.querySelector('.userTask');
  editInput.addEventListener('input', edit);
  const toggleInput = listItem.querySelector('.userTask');
  toggleInput.addEventListener('click', toggle);
};

export const addNew = () => {
  const userInput = document.getElementById('text').value;
  const newTask = new Task(userInput);
  taskList.push(newTask);
  populate();
  localStorage.setItem('List Storage', JSON.stringify(taskList));
};

export const display = () => {
  const taskHolder = document.querySelector('.listholder');
  for (let i = 0; i < taskList.length; i += 1) {
    const listItem = document.createElement('li');
    listItem.classList.add('listitem');
    listItem.innerHTML = `
    <div class="check">
      <input type="checkbox" class="checkbox"/>
      <input type="text" class="userTask" value="${taskList[i].description}">
      <div class="button-wrapper">
        <i class="fa-solid fa-trash-can"></i>
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>
    </div>
    `;
    taskHolder.appendChild(listItem);
    const removeButton = listItem.querySelector('.fa-trash-can');
    removeButton.addEventListener('click', removeItem);
    const editInput = listItem.querySelector('.userTask');
    editInput.addEventListener('input', edit);
    const toggleInput = listItem.querySelector('.userTask');
    toggleInput.addEventListener('click', toggle);
  }
};
