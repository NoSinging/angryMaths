
var Cross = function(game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, 'wrong');
};

Cross.prototype = Object.create(Phaser.Sprite.prototype);
Cross.prototype.constructor = Cross;

Cross.prototype.update = function() {
  // write your prefab's specific update code here
};

