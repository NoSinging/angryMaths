angryMaths.MainMenu = function() {};

angryMaths.MainMenu.prototype = {
  create: function() {
    this.add.sprite(0, 0, 'background');


    this.playButton = game.add.button(game.width/2, this.game.height / 2,"play",this.play,this);
    this.playButton.anchor.setTo(0.5);

    this.startText = this.game.add.bitmapText(0,0, 'raffic', 'times table mission', 64);
    this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    this.startText.y = this.game.height / 2 + this.startText.height / 2 - 200

    this.settingsButton = game.add.button(20, game.height-200,  "settings", this.settings, this);

  },
  update: function() {
  },
  play: function() {

    // going to level select state
    this.game.state.start('LevelSelect');
  },
  settings:function() {
    game.state.start("Settings");
  }
};