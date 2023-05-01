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
paragraph2.innerText = 'Переключение раскладки LeftCtrl + LeftAlt';
description.appendChild(paragraph2);
wrapper.appendChild(description);
// ⌘ ⌥

const shiftRendering = () => {
  const kb = document.querySelector('.keyboard');

  const oldOne = document.querySelector('.one');
  kb.replaceChild(Keyboard.getOneRow(), oldOne);

  const oldTwo = document.querySelector('.two');
  kb.replaceChild(Keyboard.getTwoRow(), oldTwo);

  const oldThree = document.querySelector('.three');
  kb.replaceChild(Keyboard.getThreeRow(), oldThree);

  const oldFour = document.querySelector('.four');
  kb.replaceChild(Keyboard.getFourRow(), oldFour);
};

function allKeyDown(event) {
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    event.preventDefault();
    localStorage.setItem('kbShift', 'down');

    shiftRendering();

    // const pressedKey = document.querySelector(`.${event.code}`);
    // pressedKey.classList.add('active');
  }
  if (event.code === 'CapsLock') {
    event.preventDefault();
    localStorage.setItem('kbCaps', 'down');

    shiftRendering();

    // const pressedKey = document.querySelector(`.${event.code}`);
    // pressedKey.classList.add('active');
  }
  if (event.code === 'ControlLeft') {
    event.preventDefault();
  }
  const pressedKey = document.querySelector(`.${event.code}`);
  pressedKey.classList.add('active');
//   console.log(event);
}

document.addEventListener('keydown', allKeyDown);
document.addEventListener('keyup', (e) => {
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    localStorage.setItem('kbShift', 'up');
    shiftRendering();
  }
  if (e.code === 'CapsLock') {
    localStorage.setItem('kbCaps', 'up');

    shiftRendering();
  }
  if (e.code === 'AltLeft' && e.ctrlKey) {
    e.preventDefault();
    localStorage.setItem('kbLang', localStorage.getItem('kbLang') === 'en' ? 'ru' : 'en');
    shiftRendering();
  }
  if (e.code === 'ControlLeft') {
    e.preventDefault();
  }
  const pressedKey = document.querySelector(`.${e.code}`);
  pressedKey.classList.remove('active');
});
