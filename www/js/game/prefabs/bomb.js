
var Bomb = function(game, x, y, key, frame) {
    Phaser.Sprite.call(this, game, x, y, 'bomb');
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};

Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.prototype.constructor = Bomb;

Bomb.prototype.update = function() {
  // write your prefab's specific update code here
};

Bomb.prototype.playAnimation = function() {
    // play animation
    myExplosion = game.add.sprite(this.parent.x, this.parent.y, 'explosion');
    myExplosion.anchor.x = 0.5;
    myExplosion.anchor.y = 0.5;
    myExplosion.animations.killOnComplete = true;
    myExplosion.animations.add('explosion');
    myExplosion.animations.play('explosion', 10, false, true);
};


