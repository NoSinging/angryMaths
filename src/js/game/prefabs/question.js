// "use strict";
// class Question {
//     constructor(game, x, y) {
//         console.log(game, x,y);
//         var key = 'logo';
//         Phaser.Sprite.call(this, game, x, y, key);
//         this.scale.setTo(0.1);
//     }
// };


var Question = function(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, 'square');

  var style = { font: "32px Arial", fill: "#ff0044"};

  // create a child text object
  this.text = game.add.text(-100, 0, "", style);
  this.addChild(this.text);

};

Question.prototype = Object.create(Phaser.Sprite.prototype);
Question.prototype.constructor = Question;

Question.prototype.update = function() {

  // write your prefab's specific update code here

};

Question.prototype.setText = function(text) {

  // update the question text
  this.text.setText(text);
};