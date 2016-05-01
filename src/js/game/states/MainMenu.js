angryMaths.MainMenu = function() {};

angryMaths.MainMenu.prototype = {
  create: function() {
    this.add.sprite(0, 0, 'background');


    this.startText = this.game.add.bitmapText(0,0, 'raffic', 'tap to start', 32);
    this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    this.startText.y = this.game.height / 2 + this.startText.height / 2;

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {

      // going to level select state
      this.game.state.start('LevelSelect');
    }
  }
};