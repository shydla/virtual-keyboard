import './scss/style.scss';

const wrapper = document.createElement('main');
wrapper.classList.add('wrapper');
const h1 = document.createElement('h1');
h1.classList.add('h1');
h1.innerText = 'RSS Виртуальная клавиатура';
document.body.appendChild(wrapper);
wrapper.appendChild(h1);
