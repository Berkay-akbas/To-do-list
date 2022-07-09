import { taskList } from './index.js'; // eslint-disable-line
let localStorageList = [];

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

const checked = (event) => {
  const item = event.target.closest('li');
  const nodes = Array.from(item.parentNode.children);
  const index = nodes.indexOf(item);
  const taskAll = localStorage.getItem('List Storage');
  const taskToChange = JSON.parse(taskAll);
  item.classList.toggle('line');
  if ((taskToChange[index].completed === true)) {
    taskToChange[index].completed = false;
  } else {
    taskToChange[index].completed = true;
  }
  localStorage.setItem('List Storage', JSON.stringify(taskToChange));
};

export class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
  }
}

export const edit = (event) => {
  localStorageList = JSON.parse(localStorage.getItem('List Storage'));
  const editInput = document.querySelectorAll('.userTask');
  const item = event.target.closest('li');
  const nodes = Array.from(item.parentNode.children);
  const index = nodes.indexOf(item);
  localStorageList[index].description = editInput[index].value;
  for (let i = 0; i < localStorageList.length; i += 1) {
    localStorageList[i].index = i + 1;
  }
  localStorage.setItem('List Storage', JSON.stringify(localStorageList));
};

export const removeItem = (event) => {
  localStorageList = JSON.parse(localStorage.getItem('List Storage'));
  const item = event.target.closest('li');
  const nodes = Array.from(item.parentNode.children);
  const index = nodes.indexOf(item);
  localStorageList.splice(index, 1);
  item.remove();
  for (let i = 0; i < localStorageList.length; i += 1) {
    localStorageList[i].index = i + 1;
  }
  localStorage.setItem('List Storage', JSON.stringify(localStorageList));
};

export const display = () => {
  localStorageList = JSON.parse(localStorage.getItem('List Storage'));
  const taskHolder = document.querySelector('.listholder');
  for (let i = 0; i < localStorageList.length; i += 1) {
    const listItem = document.createElement('li');
    listItem.classList.add('listitem');
    let x = String(/checked/);
    x = x.substring(1, x.length - 1);
    let ifcheck;
    if (localStorageList[i].completed) {
      ifcheck = x;
      listItem.classList.toggle('line');
    }
    listItem.innerHTML = `
    <div class="check">
      <input type="checkbox" class="checkbox" ${ifcheck}>
      <input type="text" class="userTask" value="${localStorageList[i].description}">
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
    const checkbox = listItem.querySelector('input[type=checkbox]');
    checkbox.addEventListener('change', checked);
  }
};

export const removeAll = () => {
  localStorageList = JSON.parse(localStorage.getItem('List Storage'));
  const all = document.querySelectorAll('li');
  all.forEach((li) => {
    li.remove();
  });

  const arr = [];
  localStorageList.forEach((item) => {
    if (item.completed === true) {
      arr.push(item);
    }
  });
  const a = localStorageList.filter((item) => !arr.includes(item));
  localStorage.setItem('List Storage', JSON.stringify(a));
  display();
};

export const populate = () => {
  const taskHolder = document.querySelector('.listholder');
  for (let i = 0; i < localStorageList.length; i += 1) {
    localStorageList[i].index = i + 1;
  }
  const listItem = document.createElement('li');
  listItem.classList.add('listitem');
  const a = localStorageList.slice(-1);
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
  const checkbox = listItem.querySelector('input[type=checkbox]');
  checkbox.addEventListener('change', checked);
};

export const addNew = () => {
  if (JSON.parse(localStorage.getItem('List Storage')) === null) {
    localStorageList = [];
    localStorage.setItem('List Storage', JSON.stringify(localStorageList));
  }
  localStorageList = JSON.parse(localStorage.getItem('List Storage'));
  const userInput = document.getElementById('text').value;
  const newTask = new Task(userInput);
  localStorageList.push(newTask);
  populate();
  localStorage.setItem('List Storage', JSON.stringify(localStorageList));
};
