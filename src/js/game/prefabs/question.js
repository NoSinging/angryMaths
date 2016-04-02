
var Question = function(game, x, y, key, frame) {
  var style = { font: "32px Arial", fill: "#ff0044"};
  Phaser.Text.call(this, game, x, y, 'some text', style);
};

Question.prototype = Object.create(Phaser.Text.prototype);
Question.prototype.constructor = Question;

Question.prototype.update = function() {
  // write your prefab's specific update code here
};

Question.prototype.setText = function(text) {
  // update the question text
   this.text = text;
};
