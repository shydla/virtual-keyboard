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
textArea.cols = 7;
textArea.rows = 56;
textArea.spellcheck = false;
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

const textarea = document.querySelector('.textarea');
textarea.focus();
// ⌘ ⌥
const backspace = () => {
  let start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  if (start === end) {
    start -= 1;
  }
  const valueArr = textarea.value.split('');
  const firstPart = valueArr.slice(0, start);
  const secondPart = valueArr.slice(end);
  textarea.value = firstPart.join('') + secondPart.join('');
};
const horizontalArrow = (direction) => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  if (direction === 'ArrowLeft') {
    if (start !== end) {
      textarea.selectionEnd = start;
    } else {
      textarea.selectionStart = start > 0 ? start - 1 : start;
      textarea.selectionEnd = start > 0 ? start - 1 : start;
    }
  }
  if (direction === 'ArrowRight') {
    if (start !== end) {
      textarea.selectionStart = end;
    } else {
      textarea.selectionStart = start > 0 ? start + 1 : start;
      textarea.selectionEnd = start > 0 ? start + 1 : start;
    }
  }
};
const verticalArrow = (direction) => {
  let arrTmp = [];
  const tmp = [];
  const arr = textarea.value.split('');
  arr.forEach((e) => {
    if (e !== '\n') {
      arrTmp.push(e);
    } else {
      arrTmp.push('\n');
      tmp.push(arrTmp);
      arrTmp = [];
    }
  });
  if (arr[arr.length - 1] !== '\n') {
    tmp.push(arrTmp);
  }
  let count;
  let i = 0;
  while (count < textarea.selectionEnd) {
    count += tmp[i].length;
    i += 1;
  }
  console.log(tmp);
  console.log(i);
  console.log(direction);
};
const printSymbol = (element) => {
  let value;
  if (element === 'Tab') {
    value = '   ';
  } else if (element === 'Enter') {
    value = '\n';
  } else {
    value = document.querySelector(`.${element}`).firstChild.innerText;
    // console.log(`.${element}`);
    // console.log(document.querySelector(`.${element}`).firstChild.innerText);
  }
  const end = textarea.selectionEnd;
  const valueArr = textarea.value.split('');

  const firstPart = valueArr.slice(0, textarea.selectionEnd);
  firstPart.push(value);
  const secondPart = valueArr.slice(textarea.selectionEnd);
  textarea.value = firstPart.join('') + secondPart.join('');
  textarea.selectionEnd = end + 1;
};

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
// TODO clean     event.preventDefault();
const allKeyDown = (event) => {
  event.preventDefault();
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    event.preventDefault();
    localStorage.setItem('kbShift', 'down');

    shiftRendering();
  } else if (event.code === 'CapsLock') {
    event.preventDefault();
    localStorage.setItem('kbCaps', 'down');

    shiftRendering();
  } else if (event.code === 'ControlLeft') {
    event.preventDefault();
  } else if (event.code === 'Backspace') {
    event.preventDefault();
    backspace();
  } else if (event.code === 'AltLeft') {
    event.preventDefault();
  } else if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
    event.preventDefault();
    horizontalArrow(event.code);
  } else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
    event.preventDefault();
    verticalArrow(event.code);
  } else {
    const pressedKey = document.querySelector(`.${event.code}`);
    pressedKey.classList.add('active');
    console.log(event);
    printSymbol(event.code);
  }
};
const allKeyUp = (event) => {
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    localStorage.setItem('kbShift', 'up');
    shiftRendering();
  } else if (event.code === 'CapsLock') {
    localStorage.setItem('kbCaps', 'up');

    shiftRendering();
  } else if (event.code === 'AltLeft' && event.ctrlKey) {
    event.preventDefault();
    localStorage.setItem('kbLang', localStorage.getItem('kbLang') === 'en' ? 'ru' : 'en');
    shiftRendering();
  } else if (event.code === 'ControlLeft') {
    event.preventDefault();
  } else {
    const pressedKey = document.querySelector(`.${event.code}`);
    pressedKey.classList.remove('active');
  }
};
document.addEventListener('keydown', allKeyDown);
document.addEventListener('keyup', allKeyUp);
window.addEventListener('click', () => textarea.focus());
