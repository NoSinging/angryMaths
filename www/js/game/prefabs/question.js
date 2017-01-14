
var Question = function(game, x, y) {
  this.FONT_SIZE = 96;
  Phaser.BitmapText.call(this, game, x, y,'raffic', 'some text', this.FONT_SIZE);
  game.add.existing(this);

};

Question.prototype = Object.create(Phaser.BitmapText.prototype);
Question.prototype.constructor = Question;

Question.prototype.update = function() {
  // write your prefab's specific update code here
};

Question.prototype.setText = function(text) {
  // update the question text
   this.text = text;
};

Question.prototype.setX = function() {
  // update the question text
   this.x = 450;//3*game.width/4-this.width/2;
};
