const Keypress = require('keypress');
const TTY = require('tty');

const INPUT_EVENTS = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
  '@', '#', '$', '%', '^', '&', '*', '(', ')', '[', ']', '{', '}', '_', '+', '-', '=', '/', ',', '.', ':', ';', '`'
]
const CHAR_KEY_MAP = {
  '0': { name: '0', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '1': { name: '1', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '2': { name: '2', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '3': { name: '3', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '4': { name: '4', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '5': { name: '5', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '6': { name: '6', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '7': { name: '7', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '8': { name: '8', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '9': { name: '9', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '@': { name: '@', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '#': { name: '#', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '$': { name: '$', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '%': { name: '%', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '^': { name: '^', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '&': { name: '&', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '*': { name: '*', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '(': { name: '(', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  ')': { name: ')', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '[': { name: '[', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  ']': { name: ']', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '{': { name: '{', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '}': { name: '}', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '_': { name: '_', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '+': { name: '+', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '-': { name: '-', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '=': { name: '=', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '/': { name: '/', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  ',': { name: ',', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '.': { name: '.', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  ':': { name: ':', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  ';': { name: ';', meta: false, shift: false, sequence: '', code: '', isInputChar: true },
  '`': { name: ';', meta: false, shift: false, sequence: '', code: '', isInputChar: true }
}

class KeyboardListener {
  static Init() {
    this.StdIn = process.stdin;
    
    Keypress(this.StdIn);

    this.StdIn.on('keypress', (chr, key) => {
      console.log(chr, key);

      if (!key && chr && CHAR_KEY_MAP[chr]) {
        key = CHAR_KEY_MAP[chr];
      } else if (key) {
        key['isInputChar'] = typeof chr != 'undefined' && INPUT_EVENTS.indexOf(key.name) > -1;
      }
      
      this._Listeners.forEach((listener) => listener(key));
    });

    typeof this.StdIn.setRawMode == 'function'
      ? this.StdIn.setRawMode(true)
      : TTY.setRawMode(true);

    this.StdIn.resume();
  }

  static RegisterListener(listener) {
    if (!this._IsRegistered(listener)) {
      this._Listeners.push(listener);
    }

    return;
  }

  static DeregisterListener(listener) {
    const index = this._Listeners.indexOf(listener);

    if (index != -1) {
      this._Listeners = this._Listeners.splice(index, 1);
    }

    return;
  }

  static _IsRegistered(listener) {
    return this._Listeners.indexOf(listener) > -1;
  }
}

KeyboardListener._Listeners = [];
KeyboardListener.StdIn = undefined;

module.exports = KeyboardListener;