angryMaths.MainMenu = function() {};

angryMaths.MainMenu.prototype = {
  create: function() {
    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);


    this.startText = this.game.add.bitmapText(0,0, 'raffic', 'tap to start', 32);
    this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    this.startText.y = this.game.height / 2 + this.splash.height / 2;

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {

      // going to level select state
      this.game.state.start('LevelSelect');
    }
  }
};