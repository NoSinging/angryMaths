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
    var titleText = game.add.bitmapText(0, 0, 'raffic', levelTitle, 92);
    titleText.x = this.game.width / 2 - titleText.textWidth / 2;
    titleText.y = 80;


    // display the times table
    numItemsInFirstColumn = Math.ceil(questions.length/2);
    firstColumnX = 200;
    secondColumnX = 800;
    itemSpacingY = 72;
    //numItemsInSecondColumn = questions.length - numItemsInFirstColumn;
    for(var i=0; i<numItemsInFirstColumn; i++){
        game.add.bitmapText(firstColumnX, 200 + i*itemSpacingY, 'raffic', questions[i].display, 64);
    }

    for(var i=numItemsInFirstColumn; i<questions.length; i++){
        game.add.bitmapText(secondColumnX, 200 + (i-numItemsInFirstColumn)*itemSpacingY, 'raffic', questions[i].display, 64);
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