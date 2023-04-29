export default class Keyboard {
  static #getKey(value, lang) {
    let kbCaps = 'up';
    if (localStorage.getItem('caps')) {
      kbCaps = localStorage.getItem('kbCaps');
    }
    let currentLang = 'en';
    if (localStorage.getItem('kbLang')) {
      currentLang = localStorage.getItem('kbLang');
    }
    const langStr = document.createElement('div');
    langStr.classList.add(lang);
    if (lang !== currentLang) {
      langStr.classList.add('hidden');
    }
    const pos = ['up', 'down'];
    for (let i = 0; i < 2; i += 1) {
      const strKey = document.createElement('span');
      strKey.classList.add(pos[i]);
      if (kbCaps !== pos[i]) {
        strKey.classList.add('hidden');
      }
      strKey.innerText = value[i];
      langStr.appendChild(strKey);
    }
    return langStr;
  }

  static #getRow(rowData, line) {
    const row = document.createElement('div');

    row.classList.add(line);
    row.classList.add('row');
    for (let i = 0; i < rowData.length; i += 1) {
      const key = document.createElement('div');
      key.classList.add('key');

      if (typeof rowData[i] !== 'string') {
        const res = Object.keys(rowData[i]);

        const [keySymbol] = res;
        key.classList.add(keySymbol);
        const [enDown, enUp, ruDown, ruUp] = rowData[i][keySymbol];

        key.appendChild(this.#getKey([enDown, enUp], 'en'));
        // key.appendChild(this.#getKey(enUp, 'en', 'Up'));
        key.appendChild(this.#getKey([ruDown, ruUp], 'ru'));
        // key.appendChild(this.#getKey(ruUp, 'ru', 'Up'));
      } else {
        key.classList.add(rowData[i]);
        let value;
        switch (rowData[i]) {
          case 'ShiftLeft':
            value = '⇧   ';
            break;
          case 'ShiftRight':
            value = '     ⇧';
            break;
          case 'ControlLeft':
            value = 'ctrl';
            break;
          case 'ArrowUp':
            value = '↑';
            break;
          case 'ArrowLeft':
            value = '←';
            break;
          case 'ArrowDown':
            value = '↓';
            break;
          case 'ArrowRight':
            value = '→';
            break;
          case 'AltLeft':
            value = '⌥';
            break;
          case 'MetaLeft':
            value = '⌘';
            break;
          case 'MetaRight':
            value = '⌘';
            break;
          case 'AltRight':
            value = '⌥';
            break;
          case 'Space':
            value = ' ';
            break;

          default:
            value = '';
        }
        key.innerText = value || rowData[i];
      }
      row.appendChild(key);
    }
    return row;
  }

  static getOneRow() {
    const rowData = [
      { Backquote: ['§', '±', 'ё', 'Ё'] },
      { Digit1: ['1', '!', '1', '!'] },
      { Digit2: ['2', '@', '2', '"'] },
      { Digit3: ['3', '#', '3', '№'] },
      { Digit4: ['4', '$', '4', ';'] },
      { Digit5: ['5', '%', '5', '%'] },
      { Digit6: ['6', '^', '6', ':'] },
      { Digit7: ['7', '&', '7', '?'] },
      { Digit8: ['8', '*', '8', '*'] },
      { Digit9: ['9', '(', '9', '('] },
      { Digit0: ['0', ')', '0', ')'] },
      { Minis: ['-', '_', '-', '_'] },
      { Equal: ['=', '+', '=', '+'] },
      'Backspace',
    ];

    const oneLine = this.#getRow(rowData, 'one');

    return oneLine;
  }

  static getTwoRow() {
    const rowData = [
      'Tab',
      { KeyQ: ['q', 'Q', 'й', 'Й'] },
      { KeyW: ['w', 'W', 'ц', 'Ц'] },
      { KeyE: ['e', 'E', 'у', 'У'] },
      { KeyR: ['r', 'R', 'к', 'К'] },
      { KeyT: ['t', 'T', 'е', 'Е'] },
      { KeyY: ['y', 'Y', 'н', 'Н'] },
      { KeyU: ['u', 'U', 'г', 'Г'] },
      { KeyU: ['i', 'I', 'ш', 'ш'] },
      { KeyI: ['o', 'O', 'щ', 'Щ'] },
      { KeyO: ['p', 'P', 'з', 'З'] },
      { BracketLeft: ['[', '{', 'х', 'Х'] },
      { BracketRight: [']', '}', 'ъ', 'Ъ'] },
      'Del',
    ];

    const twoLine = this.#getRow(rowData, 'one');

    return twoLine;
  }

  static getThreeRow() {
    const rowData = [
      'CapsLook',
      { KeyA: ['a', 'A', 'ф', 'Ф'] },
      { KeyS: ['s', 'S', 'ы', 'Ы'] },
      { KeyD: ['d', 'D', 'в', 'В'] },
      { KeyF: ['f', 'F', 'а', 'А'] },
      { KeyG: ['g', 'G', 'п', 'П'] },
      { KeyH: ['h', 'H', 'р', 'Р'] },
      { KeyJ: ['j', 'J', 'о', 'О'] },
      { KeyK: ['k', 'K', 'л', 'Л'] },
      { KeyL: ['l', 'L', 'д', 'Д'] },
      { Semicolon: [';', ':', 'ж', 'Ж'] },
      { Quote: ["'", '"', 'э', 'Э'] },
      { Backslash: ['\\', '|', '\\', '/'] },
      'Enter',
    ];

    const threeLine = this.#getRow(rowData, 'one');

    return threeLine;
  }

  static getFourRow() {
    const rowData = [
      'ShiftLeft',
      { IntlBackslash: ['`', '~', ']', '['] },
      { KeyZ: ['z', 'Z', 'я', 'Я'] },
      { KeyX: ['x', 'X', 'ч', 'Ч'] },
      { KeyC: ['c', 'C', 'с', 'С'] },
      { KeyV: ['v', 'V', 'м', 'М'] },
      { KeyB: ['b', 'B', 'и', 'И'] },
      { KeyN: ['n', 'N', 'т', 'Т'] },
      { KeyM: ['m', 'M', 'ь', 'Ь'] },
      { Comma: [',', '<', 'б', 'Б'] },
      { Period: ['.', '>', 'ю', 'Ю'] },
      { Slash: ['/', '?', '.', ','] },
      'ArrowUp',
      'ShiftRight',
    ];

    const fourLine = this.#getRow(rowData, 'one');

    return fourLine;
  }

  static getFiveRow() {
    const rowData = [
      'ControlLeft',
      'AltLeft',
      'MetaLeft',
      'Space',
      'MetaRight',
      'AltRight',
      'ArrowLeft',
      'ArrowDown',
      'ArrowRight',
    ];

    const fiveLine = this.#getRow(rowData, 'one');

    return fiveLine;
  }
}
