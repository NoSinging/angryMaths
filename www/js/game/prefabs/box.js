var Box = function(game,x,y) {

    Phaser.Sprite.call(this, game, x, y, 'box');
    game.physics.p2.enable(this);
    game.add.existing(this);
};

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function() {
  // write your prefab's specific update code here
};

Box.prototype.setCollisionGroup = function(CollisionGroup) {
    this.body.setCollisionGroup(CollisionGroup)
};

Box.prototype.collides = function(CollisionGroup) {
    this.body.collides(CollisionGroup)
};

