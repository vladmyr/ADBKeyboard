const KeyboardListener = require('./Src/KeyboardListener');
const ADBCommander = require('./Src/ADBCommander');

class ADBKeyboard {
  static Main() {
    KeyboardListener.Init();

    KeyboardListener.RegisterListener(this.KeyboardListener.bind(this));
    KeyboardListener.RegisterListener(ADBCommander.KeyboardListener.bind(ADBCommander));
  }

  static KeyboardListener(key) {
    if (key && key.meta && key.name == 'q') {
      process.stdin.pause();
      process.exit(0);
    }
  }
}

ADBKeyboard.Main();