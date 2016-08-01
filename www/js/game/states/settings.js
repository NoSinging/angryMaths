angryMaths.Settings = function() {};

angryMaths.Settings.prototype = {
  create: function() {
    // Clear progress option
    this.startText = this.game.add.bitmapText(game.width/2,game.height/2, 'raffic', "Clear progress?", 32);
    game.add.button(game.width/2, game.height/2 + 100,  "replay", this.clearProgress, this);

    // navigation
    game.add.button(100, 800,  "back", this.back, this);
  },
  update: function() {
  },
  clearProgress: function() {
    // going to level select state
    game.levels.clearProgress();
  },
  back: function() {
    // going to level select state
    this.game.state.start('MainMenu');
  }
};