angryMaths.LevelOver = function() {};

angryMaths.LevelOver.prototype = {
  create: function() {

    game.add.sprite(0, 0, 'background');

    var starIcon = "star";

    // get the number of stars
    var stars = game.state.states['PlayLevel'].stars;
    var totalCorrect = game.state.states['PlayLevel'].questionsCorrect;
    var totalWrong = game.state.states['PlayLevel'].questionsWrong;



    // Show stars for that level
    for(var i=1; i<=3; i++){
      // show either the gold or grey icon
      starIcon = (i<=stars) ? "star":"starGrey";
      game.add.image((this.game.width / 2) + (i-2)*64 , 200,  starIcon);
    }

    // show the number right and wrong
    game.add.image(100, 300,  "correct");
    game.add.bitmapText(250, 350, 'raffic', '' + totalCorrect, 64);

    game.add.image(400 , 300,  "wrong");
    game.add.bitmapText(550, 350, 'raffic', '' + totalWrong, 64);

    // get the questions and answers from the played level
    this.questions = game.state.states['PlayLevel'].questions;


    // Show up to 3 incorrect answers
    var displayAnswer = '';
    var displayCount = 0;
    var AnswerXoffset = 0;
    var AnswerYoffset = 0;

    for(var i=0; i<this.questions.length; i++){
      if (!this.questions[i].answeredCorrectly) {
        displayAnswer = this.questions[i].display;
        game.add.bitmapText(100 + AnswerXoffset, 560 + displayCount*64 + AnswerYoffset, 'raffic', displayAnswer, 32);
        displayCount++;
        if (displayCount>4) {
          AnswerXoffset = 300;
          AnswerYoffset = -320;
        }
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
    this.startText.y = 500;

    // navigation
    this.menuButton = game.add.button(game.width/2-200, 1000,  "menu", this.menu, this);
    this.menuButton.anchor.setTo(0.5);
    this.replyButton = game.add.button(game.width/2, 1000,  "replay", this.replay, this);
    this.replyButton.anchor.setTo(0.5);
    // show the 'play' next level if it's available
    if (game.levels.isNextLevelUnlocked()) {
      this.nextButton = game.add.button(game.width/2 +200, 1000,  "next", this.next, this);
      this.nextButton.anchor.setTo(0.5);
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