angryMaths.LevelOver = function() {};

angryMaths.LevelOver.prototype = {
  create: function() {


    var starIcon = "star";

    // get the number of stars
    var stars = this.game.state.states['PlayLevel'].stars;
    console.log(stars);

    // Well done text
    var levelOverTextYoffest = 200;
    this.startText = this.game.add.bitmapText(0,0, 'raffic', 'Well done', 32);
    this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    this.startText.y = this.game.height / 2 + - levelOverTextYoffest;


    // Show stars for that level
    for(var i=1; i<=3; i++){
      // show either the gold or grey icon
      starIcon = (i<=stars) ? "star":"starGrey";
      game.add.image((this.game.width / 2) + (i-2)*64 , this.game.height / 2,  starIcon);
    }


    this.startText = this.game.add.bitmapText(0,0, 'raffic', 'tap to continue', 32);
    this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    this.startText.y = this.game.height / 2 + levelOverTextYoffest;

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {

      // going to level select state
      this.game.state.start('LevelSelect');
    }
  }
};