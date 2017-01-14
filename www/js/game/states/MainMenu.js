angryMaths.MainMenu = function() {};

angryMaths.MainMenu.prototype = {
  create: function() {
    this.add.sprite(0, 0, 'background');

    logoX = 360;
    logoY = 180
    this.logo = game.add.image(logoX,logoY, 'helmet2');

    this.playButton = game.add.button(logoX+400, logoY+180,"play",this.play,this);

    this.startText = this.game.add.bitmapText(0,0, 'raffic', 'times table mission', 64);
    this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    this.startText.y = 200

    // setting button
    // this.settingsButton = game.add.button(20, game.height-200,  "settings", this.settings, this);

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