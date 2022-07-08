import './style.css';
// eslint-disable-next-line
import { 
  display, addNew,
} from './functions.js';

export let taskList = []; // eslint-disable-line
let localStorageList = [];
localStorageList = JSON.parse(localStorage.getItem('List Storage'));

if (localStorageList !== null) {
  taskList = [...localStorageList];
}

const addButton = document.querySelector('.fa-greater-than');
addButton.addEventListener('click', addNew);

display();