
var HealthKit = function(game, x, y, key, frame) {
    Phaser.Sprite.call(this, game, x, y, 'healthKit');
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};

HealthKit.prototype = Object.create(Phaser.Sprite.prototype);
HealthKit.prototype.constructor = HealthKit;

HealthKit.prototype.update = function() {
  // write your prefab's specific update code here
};

HealthKit.prototype.playAnimation = function() {
    // play animation
};