
var Tick = function(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, 'correct');
};

Tick.prototype = Object.create(Phaser.Sprite.prototype);
Tick.prototype.constructor = Tick;

Tick.prototype.update = function() {
  // write your prefab's specific update code here
};

Question.prototype.annimate = function() {
  // 
};
