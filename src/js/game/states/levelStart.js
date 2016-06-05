angryMaths.LevelStart = function() {};

angryMaths.LevelStart.prototype = {
  create: function() {

    game.add.sprite(0, 0, 'background');

    var questionsKey = 'questionsLevel' + game.levels.level;
    var questionJSON = game.cache.getJSON(questionsKey);
    var levelTitle = questionJSON.title;
    var titleText = game.add.bitmapText(0, 0, 'raffic', levelTitle, 64);
    titleText.x = game.width / 2 - titleText.textWidth / 2;
    titleText.y = game.height / 2 - 200;

    this.playButton = game.add.button(game.width/2, game.height/2,  "play", this.next, this);
    this.playButton.anchor.setTo(0.5);

    // navigation
    game.add.button(24, game.height - 160,  "menu", this.menu, this);
  },
  update: function() {
  },
  next: function() {
    // play the level
    this.game.state.start('PlayLevel');
  },
  menu: function() {
      // going to level select state
      this.game.state.start('LevelSelect');
  }
};