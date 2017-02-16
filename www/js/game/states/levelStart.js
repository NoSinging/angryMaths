angryMaths.LevelStart = function() {};

angryMaths.LevelStart.prototype = {
  create: function() {

    // background
    game.add.sprite(0, 0, 'background');


    // questions data
    var questionsKey = 'questionsLevel' + game.levels.level;
    var questionJSON = game.cache.getJSON(questionsKey);
    this.questions = questionJSON.questions;
    var levelTitle = questionJSON.title;
    this.sortQuestions();

    // title
    var titleText = game.add.bitmapText(0, 0, 'raffic', levelTitle, 92);
    titleText.x = this.game.width / 2 - titleText.textWidth / 2;
    titleText.y = 80;


    // display the times table
    numItemsInFirstColumn = Math.ceil(this.questions.length/2);
    firstColumnX = 200;
    secondColumnX = 800;
    itemSpacingY = 72;
    //numItemsInSecondColumn = questions.length - numItemsInFirstColumn;
    for(var i=0; i<numItemsInFirstColumn; i++){
        game.add.bitmapText(firstColumnX, 200 + i*itemSpacingY, 'raffic', this.questions[i].display, 64);
    }

    for(var i=numItemsInFirstColumn; i<this.questions.length; i++){
        game.add.bitmapText(secondColumnX, 200 + (i-numItemsInFirstColumn)*itemSpacingY, 'raffic', this.questions[i].display, 64);
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
  },

  sortQuestions: function() {
    this.questions.sort(function (a, b) {
      if (Number(a.id) > Number(b.id)) {
        return 1;
      }
      if (Number(a.id) < Number(b.id)) {
        return -1;
      }
      // a must be equal to b
      // randomise sorting or equal order
      return (Math.random() < 0.5) ? -1:1;
    });
}
};