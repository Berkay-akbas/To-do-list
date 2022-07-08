import './style.css';
import { toggle } from './functions.js';
import { removeItem, edit, populate, display, addNew} from './functions.js';

export let taskList = [];
let localStorageList = [];
localStorageList = JSON.parse(localStorage.getItem('List Storage'));

 if(localStorageList !== null) {
  taskList = [...localStorageList];
}

class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
  }
}


const addButton = document.querySelector('.fa-greater-than');
addButton.addEventListener('click', addNew);

display();