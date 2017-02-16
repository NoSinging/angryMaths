var Barrel = function(game,x,y) {

    Phaser.Sprite.call(this, game, x+30.5, y-41, 'barrel',0);
    // adding physics via hazard manager
    game.physics.p2.enable(this);

    this.body.addRectangle(61,82);
};

Barrel.prototype = Object.create(Phaser.Sprite.prototype);
Barrel.prototype.constructor = Barrel;

Barrel.prototype.update = function() {
  // write your prefab's specific update code here
};



Barrel.prototype.setCollisionGroup = function(CollisionGroup) {

        this.body.setCollisionGroup(CollisionGroup);
        this.body.collides([CollisionGroup],this.hitSomething, this);
};


Barrel.prototype.hitSomething =  function(BarrelBody, CollidingBody) {

    //  body1 is the barrel (as it's the body that owns the callback)
    //  body2 is the body it impacted with,
    //  As body2 is a Phaser.Physics.P2.Body object, you access its owner (the sprite) via the sprite property:
    //  The first argument may be null or not have a sprite property, such as when you hit the world bounds.
    if (CollidingBody !== null && CollidingBody.sprite !== null && CollidingBody.sprite.key == 'answerFrame')
    {
        var vectorBetweenSprites = new Phaser.Point((this.x - CollidingBody.sprite.x), (this.y - CollidingBody.sprite.y));
        vectorBetweenSprites.setMagnitude(50);
        CollidingBody.applyImpulse([vectorBetweenSprites.x,vectorBetweenSprites.y],0,0);
        this.playDestroyAnimation();
        this.destroy();
    }

};

Barrel.prototype.playDestroyAnimation = function() {
    // play animation
    myExplosion = game.add.sprite(this.x, this.y, 'toxicSmoke');
    myExplosion.anchor.x = 0.5;
    myExplosion.anchor.y = 0.5;

    myExplosionAnimation = myExplosion.animations.add('toxicSmoke');
    myExplosionAnimation.play(10, false, true);
    this.alpha = 0;
};


