const { exec } = require('child_process');

const ADB_KEYEVENT = {
  "KEYCODE_UNKNOWN": 0,
  "KEYCODE_MENU": 1, 
  "KEYCODE_SOFT_RIGHT": 2, 
  "KEYCODE_HOME": 3, 
  "KEYCODE_BACK": 4, 
  "KEYCODE_CALL": 5, 
  "KEYCODE_ENDCALL": 6, 
  "KEYCODE_0": 7, 
  "KEYCODE_1": 8, 
  "KEYCODE_2": 9, 
  "KEYCODE_3": 10, 
  "KEYCODE_4": 11, 
  "KEYCODE_5": 12, 
  "KEYCODE_6": 13, 
  "KEYCODE_7": 14, 
  "KEYCODE_8": 15, 
  "KEYCODE_9": 16, 
  "KEYCODE_STAR": 17,  // *
  "KEYCODE_POUND": 18, // #
  "KEYCODE_DPAD_UP": 19, 
  "KEYCODE_DPAD_DOWN": 20, 
  "KEYCODE_DPAD_LEFT": 21, 
  "KEYCODE_DPAD_RIGHT": 22, 
  "KEYCODE_DPAD_CENTER": 23, 
  "KEYCODE_VOLUME_UP": 24, 
  "KEYCODE_VOLUME_DOWN": 25, 
  "KEYCODE_POWER": 26, 
  "KEYCODE_CAMERA": 27, 
  "KEYCODE_CLEAR": 28, 
  "KEYCODE_A": 29, 
  "KEYCODE_B": 30, 
  "KEYCODE_C": 31, 
  "KEYCODE_D": 32, 
  "KEYCODE_E": 33, 
  "KEYCODE_F": 34, 
  "KEYCODE_G": 35, 
  "KEYCODE_H": 36, 
  "KEYCODE_I": 37, 
  "KEYCODE_J": 38, 
  "KEYCODE_K": 39, 
  "KEYCODE_L": 40, 
  "KEYCODE_M": 41, 
  "KEYCODE_N": 42, 
  "KEYCODE_O": 43, 
  "KEYCODE_P": 44, 
  "KEYCODE_Q": 45, 
  "KEYCODE_R": 46, 
  "KEYCODE_S": 47, 
  "KEYCODE_T": 48, 
  "KEYCODE_U": 49, 
  "KEYCODE_V": 50, 
  "KEYCODE_W": 51, 
  "KEYCODE_X": 52, 
  "KEYCODE_Y": 53, 
  "KEYCODE_Z": 54, 
  "KEYCODE_COMMA": 55, 
  "KEYCODE_PERIOD": 56, 
  "KEYCODE_ALT_LEFT": 57, 
  "KEYCODE_ALT_RIGHT": 58, 
  "KEYCODE_SHIFT_LEFT": 59, 
  "KEYCODE_SHIFT_RIGHT": 60, 
  "KEYCODE_TAB": 61, 
  "KEYCODE_SPACE": 62, 
  "KEYCODE_SYM": 63, 
  "KEYCODE_EXPLORER": 64, 
  "KEYCODE_ENVELOPE": 65, 
  "KEYCODE_ENTER": 66, 
  "KEYCODE_DEL": 67, 
  "KEYCODE_FORWARD_DEL": 112,
  "KEYCODE_GRAVE": 68, 
  "KEYCODE_MINUS": 69, 
  "KEYCODE_EQUALS": 70, 
  "KEYCODE_LEFT_BRACKET": 71, 
  "KEYCODE_RIGHT_BRACKET": 72, 
  "KEYCODE_BACKSLASH": 73, 
  "KEYCODE_SEMICOLON": 74, 
  "KEYCODE_APOSTROPHE": 75, 
  "KEYCODE_SLASH": 76, 
  "KEYCODE_AT": 77, 
  "KEYCODE_NUM": 78, 
  "KEYCODE_HEADSETHOOK": 79, 
  "KEYCODE_FOCUS": 80, 
  "KEYCODE_PLUS": 81, 
  "KEYCODE_MENU": 82, 
  "KEYCODE_NOTIFICATION": 83, 
  "KEYCODE_SEARCH": 84, 
  "TAG_LAST_KEYCODE": 85
}

const KEYCODE_MAP = {
  // arrows
  UP: 'KEYCODE_DPAD_UP',
  DOWN: 'KEYCODE_DPAD_DOWN',
  LEFT: 'KEYCODE_DPAD_LEFT',
  RIGHT: 'KEYCODE_DPAD_RIGHT',

  // general
  RETURN: 'KEYCODE_DPAD_CENTER',
  ESCAPE: 'KEYCODE_BACK',

  // alphabet characters
  A: 'KEYCODE_A', 
  B: 'KEYCODE_B', 
  C: 'KEYCODE_C', 
  D: 'KEYCODE_D', 
  E: 'KEYCODE_E', 
  F: 'KEYCODE_F', 
  G: 'KEYCODE_G', 
  H(key) { return key.meta ? 'KEYCODE_HOME' : 'KEYCODE_H'; } , 
  I: 'KEYCODE_I', 
  J: 'KEYCODE_J', 
  K: 'KEYCODE_K', 
  L: 'KEYCODE_L', 
  M: 'KEYCODE_M', 
  N: 'KEYCODE_N', 
  O: 'KEYCODE_O', 
  P: 'KEYCODE_P', 
  Q: 'KEYCODE_Q', 
  R: 'KEYCODE_R', 
  S: 'KEYCODE_S', 
  T: 'KEYCODE_T', 
  U: 'KEYCODE_U', 
  V: 'KEYCODE_V', 
  W: 'KEYCODE_W', 
  X: 'KEYCODE_X', 
  Y: 'KEYCODE_Y', 
  Z: 'KEYCODE_Z',

  // numeric
  '0': "KEYCODE_0", 
  '1': "KEYCODE_1", 
  '2': "KEYCODE_2", 
  '3': "KEYCODE_3", 
  '4': "KEYCODE_4", 
  '5': "KEYCODE_5", 
  '6': "KEYCODE_6", 
  '7': "KEYCODE_7", 
  '8': "KEYCODE_8", 
  '9': "KEYCODE_9", 

  // marks
  'SPACE': "KEYCODE_SPACE",
  // '!': ,
  '@': "KEYCODE_AT",
  // '#':,
  // '$':,
  // '%':,
  // '^':,
  // '&':,
  // '*':,
  // '(':,
  // ')':,
  // '[':,
  // ']':,
  // '{':,
  // '}':,
  // '_':,
  '+': "KEYCODE_PLUS",
  '-': "KEYCODE_MINUS",
  '=': "KEYCODE_EQUALS",
  '/': "KEYCODE_SLASH",
  ',': "KEYCODE_COMMA",
  '.': "KEYCODE_PERIOD",
  '`': "KEYCODE_GRAVE",

  // "KEYCODE_COMMA": 55, 
  // "KEYCODE_PERIOD": 56, 
  
  // "KEYCODE_GRAVE": 68, 
  // "KEYCODE_MINUS": 69, 
  // "KEYCODE_EQUALS": 70, 
  // "KEYCODE_LEFT_BRACKET": 71, 
  // "KEYCODE_RIGHT_BRACKET": 72, 
  // "KEYCODE_BACKSLASH": 73, 
  // "KEYCODE_SEMICOLON": 74, 
  // "KEYCODE_APOSTROPHE": 75, 
  // "KEYCODE_SLASH": 76, 
  // "KEYCODE_AT": 77, 
  // "KEYCODE_NUM": 78, 
  // "KEYCODE_HEADSETHOOK": 79, 
  // "KEYCODE_FOCUS": 80, 
  // "KEYCODE_PLUS": 81, 

  // text typing
  DELETE: 'KEYCODE_FORWARD_DEL',
  BACKSPACE: 'KEYCODE_DEL',

  // device control
  PAGEUP(key) { return key.ctrl ? 'KEYCODE_VOLUME_UP' : undefined; },
  PAGEDOWN(key) { return key.ctrl ? 'KEYCODE_VOLUME_DOWN' : undefined; }
}

/**
 * TODO: improve performance by sending multiple commands with same child process. 
 * See https://stackoverflow.com/questions/24070041/send-multiple-same-keyevents-to-the-adb-shell
 */
class ADBCommander {
  static KeyboardListener(key) {
    const keyCode = this._ParseKey(key);

    console.log('keyCode', keyCode);

    if (keyCode) {
      this._KeyCodeQueue.push(keyCode);
      this._IssueKeyCodesFromQueue();
    }
  }

  static _ParseKey(key) {
    return key && key.name 
    ? typeof KEYCODE_MAP[key.name.toUpperCase()] == 'function'
      ? ADB_KEYEVENT[KEYCODE_MAP[key.name.toUpperCase()](key)]
      : ADB_KEYEVENT[KEYCODE_MAP[key.name.toUpperCase()]]
    : undefined;
  }

  static _IssueKeyCodesFromQueue() {
    if (this._IsIssuing) {
      return;
    }

    this._IsIssuing = true;
    this._IssueKeyCodesFromGenerator(this._GetGetKeyCodeCodeFromQueue());

    return;
  }

  static * _GetGetKeyCodeCodeFromQueue() {
    for (let i = 0; i < this._KeyCodeQueue.length; i++) {
      yield this._KeyCodeQueue[i];
    }

    this._KeyCodeQueue = [];

    return;
  }

  static _IssueKeyCodesFromGenerator(generator) {
    const next = generator.next()

    if (next.done) {
      this._IsIssuing = false;
      return;
    }

    exec(`adb shell input keyevent ${next.value}`, (err, stdout, stderr) => {
      this._IssueKeyCodesFromGenerator(generator);
    });

    return;
  }
}

ADBCommander._IsIssuing = false;
ADBCommander._KeyCodeQueue = [];

module.exports = ADBCommander;