import './style.css';
// eslint-disable-next-line
import { 
  display, addNew, removeAll,
} from './functions.js';

const addButton = document.querySelector('.fa-greater-than');
addButton.addEventListener('click', addNew);

const removeAllButton = document.getElementById('removeAll');
removeAllButton.addEventListener('click', removeAll);

display();