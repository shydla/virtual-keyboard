import './scss/style.scss';
import './assets/favicon.ico';
import Keyboard from './js/Keyboard';

// TODO REFACTOR!!!

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
localStorage.setItem('kbAlt', 'up');
localStorage.setItem('kbCtrl', 'up');
document.querySelector('.ArrowLeft').addEventListener('mousedown', () => false);
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
  // console.log(start);
  // console.log(end);
  if (direction === 'ArrowLeft') {
    if (start !== end) {
      textarea.selectionEnd = start;
      textarea.selectionStart = start;
    } else {
      const position = start > 0 ? start - 1 : start;
      textarea.selectionStart = position;
      textarea.selectionEnd = position;
    }
  }
  if (direction === 'ArrowRight') {
    // console.log('ss');
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
  let count = 0;
  let row = 0;
  while (count < textarea.selectionEnd) {
    count += tmp[row].length;
    row += 1;
  }
  let posInRow = textarea.selectionEnd;
  for (let i = 0; i < row - 1; i += 1) {
    posInRow -= tmp[i].length;
  }
  let newPos = 0;
  if (direction === 'ArrowUp') {
    for (let i = 0; i < row - 2; i += 1) {
      newPos += tmp[i].length;
    }
    if (row >= 2) {
      if (tmp[row - 2].length < posInRow) {
        newPos += (tmp[row - 2].length - 1);
      } else {
        newPos += posInRow;
      }
      // console.log(posInRow);

      textarea.selectionEnd = newPos;
      textarea.selectionStart = newPos;
    }
  } else {
    for (let i = 0; i <= row - 1; i += 1) {
      newPos += tmp[i].length;
    }
    if (row - 1 < tmp.length - 1) {
      if (tmp[row - 1].length < posInRow) {
        newPos += (tmp[row].length - 1);
      } else {
        newPos += posInRow;
      }

      textarea.selectionEnd = newPos;
      textarea.selectionStart = newPos;
    }
  }
};
const printSymbol = (element) => {
  let value;
  if (element === 'Tab') {
    value = '   ';
  } else if (element === 'Enter') {
    value = '\n';
  } else if (element === 'Space') {
    value = ' ';
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
  let pressedKey = document.querySelector(`.${event.code}`);

  if (pressedKey) {
    pressedKey.classList.add('active');
    // event.preventDefault();
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      // event.preventDefault();
      localStorage.setItem('kbShift', 'down');
      shiftRendering();
      pressedKey = document.querySelector(`.${event.code}`);
      pressedKey.classList.add('active');
    } else if (event.code === 'CapsLock') {
      // event.preventDefault();
      localStorage.setItem('kbCaps', 'down');

      shiftRendering();
    } else if (event.code === 'ControlLeft') {
      // event.preventDefault();
    } else if (event.code === 'Backspace') {
      event.preventDefault();
      backspace();
    } else if (event.code === 'AltLeft') {
      // event.preventDefault();
    } else if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      event.preventDefault();
      horizontalArrow(event.code);
    } else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      event.preventDefault();
      verticalArrow(event.code);
    } else {
      // console.log(event);
      printSymbol(event.code);
    }
  }
};
const allKeyUp = (event) => {
  let pressedKey = document.querySelector(`.${event.code}`);
  if (pressedKey) {
    pressedKey.classList.remove('active');
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      localStorage.setItem('kbShift', 'up');
      shiftRendering();
      pressedKey = document.querySelector(`.${event.code}`);
      pressedKey.classList.remove('active');
    } else if (event.code === 'CapsLock') {
      localStorage.setItem('kbCaps', 'up');

      shiftRendering();
    } else if ((event.code === 'AltLeft' && event.ctrlKey) || (event.code === 'ControlLeft' && event.altKey)) {
      // event.preventDefault();
      localStorage.setItem('kbLang', localStorage.getItem('kbLang') === 'en' ? 'ru' : 'en');
      shiftRendering();
    } else if (event.code === 'ControlLeft') {
      // event.preventDefault();
    }
  }
};
document.addEventListener('keydown', allKeyDown);
document.addEventListener('keyup', allKeyUp);
window.addEventListener('click', (e) => {
  textarea.focus();
  if (e.target.closest('.key')) {
    if (e.target.closest('.key').id === 'CapsLock') {
      if (localStorage.getItem('kbCaps') === 'up') {
        allKeyDown({ code: 'CapsLock' });
        localStorage.setItem('kbCaps', 'down');
      } else {
        allKeyUp({ code: 'CapsLock' });
        localStorage.setItem('kbCaps', 'up');
      }
    }
    if (e.target.closest('.key').id === 'ShiftLeft') {
      if (localStorage.getItem('kbShift') === 'up') {
        allKeyDown({ code: 'ShiftLeft' });
      } else {
        allKeyUp({ code: 'ShiftLeft' });
      }
    }
    if (e.target.closest('.key').id === 'ShiftRight') {
      if (localStorage.getItem('kbShift') === 'up') {
        allKeyDown({ code: 'ShiftRight' });
      } else {
        allKeyUp({ code: 'ShiftRight' });
      }
    }
    if (e.target.closest('.key').id === 'Backspace') {
      backspace();
    }
    if (e.target.closest('.key').id === 'ControlLeft') {
      if (!localStorage.getItem('kbCtrl')) {
        localStorage.setItem('kbCtrl', 'up');
      }
      if (localStorage.getItem('kbCtrl') === 'up') {
        allKeyDown({ code: 'ControlLeft' });
        localStorage.setItem('kbCtrl', 'down');
      } else {
        allKeyUp({ code: 'ControlLeft' });
        localStorage.setItem('kbCtrl', 'up');
      }
    }
    if (e.target.closest('.key').id === 'AltLeft') {
      // if (!localStorage.getItem('kbAlt')) {
      //   localStorage.setItem('kbAlt', 'up');
      // }
      // if (localStorage.getItem('kbAlt') === 'up') {
      //   allKeyDown({ code: 'AltLeft' });
      //   // localStorage.setItem('kbAlt', 'down');
      // } else {
      const ctrl = localStorage.getItem('kbCtrl') === 'down';
      allKeyUp({ code: 'AltLeft', ctrlKey: ctrl });
      // localStorage.setItem('kbAlt', 'up');
      // }
    }

    if (e.target.closest('.key').id === 'ArrowLeft' || e.target.closest('.key').id === 'ArrowRight') {
      // console.log(e.target.closest('.key').id);
      horizontalArrow(e.target.closest('.key').id);
    }

    printSymbol(e.target.closest('.key').id);
    textarea.focus();
  }
});
