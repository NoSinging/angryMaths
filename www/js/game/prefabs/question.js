
var Question = function(game, x, y, key, frame) {
  //var style = { font: "32px Arial", fill: "#ff0044"};
  Phaser.BitmapText.call(this, game, x, y,'raffic', 'some text', 92);
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
