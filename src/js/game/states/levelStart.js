angryMaths.LevelStart = function() {};

angryMaths.LevelStart.prototype = {
  create: function() {


    var questionsKey = 'questionsLevel' + game.levels.level;
    var questionJSON = game.cache.getJSON(questionsKey);
    var levelTitle = questionJSON.title;
    var titleText = game.add.bitmapText(0, 0, 'raffic', levelTitle, 64);
    titleText.x = game.width / 2 - titleText.textWidth / 2;
    titleText.y = game.height / 2 - 200;

    game.add.button(game.width/2, 500,  "play", this.next, this);

  },
  update: function() {
  },
  next: function() {
    // play the level
    this.game.state.start('PlayLevel');
  }
};