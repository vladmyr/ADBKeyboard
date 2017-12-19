const Keypress = require('keypress');
const TTY = require('tty');

const CHAR_KEY_MAP = {
  '!': { name: '!', meta: false, shift: false, sequence: '', code: '' },
  '@': { name: '@', meta: false, shift: false, sequence: '', code: '' },
  '#': { name: '#', meta: false, shift: false, sequence: '', code: '' },
  '$': { name: '$', meta: false, shift: false, sequence: '', code: '' },
  '%': { name: '%', meta: false, shift: false, sequence: '', code: '' },
  '^': { name: '^', meta: false, shift: false, sequence: '', code: '' },
  '&': { name: '&', meta: false, shift: false, sequence: '', code: '' },
  '*': { name: '*', meta: false, shift: false, sequence: '', code: '' },
  '(': { name: '(', meta: false, shift: false, sequence: '', code: '' },
  ')': { name: ')', meta: false, shift: false, sequence: '', code: '' },
  '[': { name: '[', meta: false, shift: false, sequence: '', code: '' },
  ']': { name: ']', meta: false, shift: false, sequence: '', code: '' },
  '{': { name: '{', meta: false, shift: false, sequence: '', code: '' },
  '}': { name: '}', meta: false, shift: false, sequence: '', code: '' },
  '_': { name: '_', meta: false, shift: false, sequence: '', code: '' },
  '+': { name: '+', meta: false, shift: false, sequence: '', code: '' },
  '-': { name: '-', meta: false, shift: false, sequence: '', code: '' },
  '=': { name: '=', meta: false, shift: false, sequence: '', code: '' },
  '/': { name: '/', meta: false, shift: false, sequence: '', code: '' },
  ',': { name: ',', meta: false, shift: false, sequence: '', code: '' },
  '.': { name: '.', meta: false, shift: false, sequence: '', code: '' },
  ':': { name: ':', meta: false, shift: false, sequence: '', code: '' },
  ';': { name: ';', meta: false, shift: false, sequence: '', code: '' },
  '`': { name: ';', meta: false, shift: false, sequence: '', code: '' }
}

class KeyboardListener {
  static Init() {
    this.StdIn = process.stdin;
    
    Keypress(this.StdIn);

    this.StdIn.on('keypress', (chr, key) => {
      console.log(chr, key);

      key = !key && chr && CHAR_KEY_MAP[chr]
        ? CHAR_KEY_MAP[chr]
        : key;

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