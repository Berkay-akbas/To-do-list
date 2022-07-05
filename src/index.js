import './style.css';

const taskList = [
  {
    description: 'hi',
    completed: false,
    index: 0,
  },
  {
    description: 'hello',
    completed: false,
    index: 1,
  },
  {
    description: 'howdy',
    completed: true,
    index: 2,
  },
];

const populate = () => {
  const taskHolder = document.querySelector('.listholder');
  for (let i = 0; i < taskList.length; i += 1) {
    const listItem = document.createElement('li');
    listItem.classList.add('listitem');
    listItem.innerHTML = `
    <div class="check">
      <input type="checkbox" />
      <p>${taskList[i].description}</p>
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </div>
  </li>
    `;
    taskHolder.appendChild(listItem);
  }
};

populate();