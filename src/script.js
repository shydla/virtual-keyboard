import './scss/style.scss';
import './assets/favicon.ico';
import Keyboard from './js/Keyboard';

const wrapper = document.createElement('main');
wrapper.classList.add('wrapper');

const h1 = document.createElement('h1');
h1.classList.add('h1');
h1.innerText = 'RSS Виртуальная клавиатура';
document.body.appendChild(wrapper);
wrapper.appendChild(h1);

const textArea = document.createElement('textarea');
textArea.classList.add('textarea');
wrapper.appendChild(textArea);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
keyboard.appendChild(Keyboard.getOneRow());
wrapper.appendChild(keyboard);

keyboard.appendChild(Keyboard.getTwoRow());
wrapper.appendChild(keyboard);

keyboard.appendChild(Keyboard.getThreeRow());
wrapper.appendChild(keyboard);

keyboard.appendChild(Keyboard.getFourRow());
wrapper.appendChild(keyboard);

keyboard.appendChild(Keyboard.getFiveRow());
wrapper.appendChild(keyboard);
// console.log(Keyboard.getOneRow());

const description = document.createElement('div');
description.classList.add('description');
const paragraph = document.createElement('p');
paragraph.classList.add('p');
const paragraph2 = document.createElement('p');
paragraph2.classList.add('p');
paragraph.innerText = 'Клавиатура создана в MacOS';
description.appendChild(paragraph);
paragraph2.innerText = 'Переключение раскладки Ctrl + Space';
description.appendChild(paragraph2);
wrapper.appendChild(description);
// ⌘ ⌥
