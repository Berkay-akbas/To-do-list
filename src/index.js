import './style.css';
import { toggle } from './functions.js';

let taskList = [];
let localStorageList = [];
localStorageList = JSON.parse(localStorage.getItem('List Storage'));
taskList = [...localStorageList];

const edit = (event) => {
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

const removeItem = (event) => {
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

const populate = () => {
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

class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
  }
}

const addNew = () => {
  const userInput = document.getElementById('text').value;
  const newTask = new Task(userInput);
  taskList.push(newTask);
  populate();
  localStorage.setItem('List Storage', JSON.stringify(taskList));
};

const addButton = document.querySelector('.fa-greater-than');
addButton.addEventListener('click', addNew);

const display = () => {
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
display();