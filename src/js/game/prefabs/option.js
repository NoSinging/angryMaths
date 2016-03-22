

var Option = function(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, 'square');

  var style = { font: "32px Arial", fill: "#ff0044"};

  // create a child text object
  this.text = game.add.text(0, 0, "", style);
  this.addChild(this.text);

};

Question.prototype = Object.create(Phaser.Sprite.prototype);
Question.prototype.constructor = Option;

Question.prototype.update = function() {

  // write your prefab's specific update code here

};

Question.prototype.setText = function(text) {

  // update the question text
  this.text.setText(text);
};