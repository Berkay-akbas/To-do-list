  const checked = (event) => {
  const item = event.target.closest('li');
  const text = event.target.closest('input[type=text]');
  const nodes = Array.from(item.parentNode.children);
  const index = nodes.indexOf(item);
  const taskAll = localStorage.getItem('List Storage');
  let taskToChange = JSON.parse(taskAll);
  item.classList.toggle('line');
  if ((taskToChange[index]['completed'] === true) ) {
    taskToChange[index]['completed'] = false;
  } else {
    taskToChange[index]['completed'] = true;
  }
  localStorage.setItem('List Storage', JSON.stringify(taskToChange));
}