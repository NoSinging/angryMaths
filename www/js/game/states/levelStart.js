angryMaths.LevelStart = function() {};

angryMaths.LevelStart.prototype = {
  create: function() {

    // background
    game.add.sprite(0, 0, 'background');


    // questions data
    var questionsKey = 'questionsLevel' + game.levels.level;
    var questionJSON = game.cache.getJSON(questionsKey);
    var questions = questionJSON.questions;
    var levelTitle = questionJSON.title;

    // title
    var titleText = game.add.bitmapText(0, 0, 'raffic', levelTitle, 64);
    titleText.x = 200;
    titleText.y = 100;


    // display the times table
    var displayAnswer = '';
    for(var i=0; i<questions.length; i++){
        displayAnswer = questions[i].display;
        game.add.bitmapText(titleText.x, 200 + i*64, 'raffic', displayAnswer, 32);
    }

    // play navigation
    this.playButton = game.add.button(game.width/2, game.height - 160,  "play", this.next, this);
    this.playButton.anchor.setTo(0.5);

    // add back button
    game.add.button(20, 40,  "back", this.back, this);


  },
  update: function() {
  },
  next: function() {
    // play the level
    this.game.state.start('PlayLevel');
  },
  back: function() {
      // going to level select state
      this.game.state.start('LevelSelect');
  }
};