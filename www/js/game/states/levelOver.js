angryMaths.LevelOver = function() {};

angryMaths.LevelOver.prototype = {
  create: function() {

    game.add.sprite(0, 0, 'background');

    var starIcon = "star";

    // get the number of stars
    // TODO: stop pocking in the internals of others
    var stars = game.state.states['PlayLevel'].stars;
    var totalCorrect = game.state.states['PlayLevel'].scoreBar.score;

    // Show stars for that level
    for(var i=1; i<=3; i++){
      // show either the gold or grey icon
      starIcon = (i<=stars) ? "star":"starGrey";
      game.add.image((this.game.width / 2) + (i-2)*64 , 100,  starIcon);
    }

    // show the number right and wrong
    // it's 146 wide
    var correctX = (this.game.width / 2) - 146/2
    game.add.image(correctX, 200,  "correct");
    game.add.bitmapText(correctX+150, 250, 'raffic', '' + totalCorrect, 64);


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

    this.startText = this.game.add.bitmapText(0,0, 'raffic', wellDoneText, 64);
    this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    this.startText.y = 400;

    // navigation
    this.menuButton = game.add.button(game.width/2-200, 600,  "menu", this.menu, this);
    this.menuButton.anchor.setTo(0.5);
    this.replyButton = game.add.button(game.width/2, 600,  "replay", this.replay, this);
    this.replyButton.anchor.setTo(0.5);
    // show the 'play' next level if it's available
    if (game.levels.isNextLevelUnlocked()) {
      this.nextButton = game.add.button(game.width/2 +200, 600,  "next", this.next, this);
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