angryMaths.LevelOver = function() {};

angryMaths.LevelOver.prototype = {
  create: function() {

    game.add.sprite(0, 0, 'background');

    var starIcon = "star";

    // get the number of stars
    var stars = game.state.states['PlayLevel'].stars;
    console.log(stars);



    // Show stars for that level
    for(var i=1; i<=3; i++){
      // show either the gold or grey icon
      starIcon = (i<=stars) ? "star":"starGrey";
      game.add.image((this.game.width / 2) + (i-2)*64 , 200,  starIcon);
    }


    // get the questions and answers from the played level
    this.questions = game.state.states['PlayLevel'].questions;


    // Show up to 3 incorrect answers
    var displayAnswer = '';
    var displayCount = 0;
    for(var i=0; i<this.questions.length && displayCount<3; i++){
      if (!this.questions[i].answeredCorrectly) {
        displayAnswer = this.questions[i].display;
        game.add.bitmapText(this.game.width / 2, 400 + displayCount*64, 'raffic', displayAnswer, 32);
        displayCount++;
      }
    }

    // if there were incorrect answers say so
    var incorrectAnswerText = (displayCount > 0) ? ", retry these ... ":"";


    // Well done text
    var wellDoneText = '';
    switch (stars) {
    case 0:
        wellDoneText = "keep trying!";
        break;
    case 1:
        wellDoneText = "nice work";
        break;
    case 2:
        wellDoneText = "great";
        break;
    case 3:
        wellDoneText = "awesome!";
        break;
    default:
        wellDoneText = "unusual!";
    }

    wellDoneText += incorrectAnswerText;

    this.startText = this.game.add.bitmapText(0,0, 'raffic', wellDoneText, 32);
    this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    this.startText.y = 300;

    // navigation
    game.add.button(game.width/2 -200, 800,  "replay", this.replay, this);
    game.add.button(game.width/2, 800,  "menu", this.menu, this);
    // show the 'play' next level if it's available
    if (game.levels.isNextLevelUnlocked()) {
      game.add.button(game.width/2 +200, 800,  "play", this.next, this);
    }

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {

      // going to level select state
      this.game.state.start('LevelSelect');
    }
  },
  menu: function() {
    // going to level select state
    this.game.state.start('LevelSelect');
  },
  replay: function() {
    // going to level select state
    this.game.state.start('PlayLevel');
  },
  next: function() {
    // going to level select state
    game.levels.level++;
    this.game.state.start('LevelStart');
  }
};