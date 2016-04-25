angryMaths.Settings = function() {};

angryMaths.Settings.prototype = {
  create: function() {
    // Clear progress option
    this.startText = this.game.add.bitmapText(game.width/2,game.height/2, 'raffic', "Clear progress?", 32);
    game.add.button(game.width/2, game.height/2 + 100,  "replay", this.clearProgress, this);

    // navigation
    game.add.button(100, 800,  "menu", this.menu, this);
  },
  update: function() {
  },
  clearProgress: function() {
    // going to level select state
    game.levels.clearProgress();
  },
  menu: function() {
    // going to level select state
    this.game.state.start('LevelSelect');
  }
};