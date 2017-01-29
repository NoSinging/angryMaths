var Barrel = function(game,x,y) {

    Phaser.Sprite.call(this, game, x, y-41, 'barrel',0);
    // adding physics via hazard manager
    game.physics.p2.enable(this);
    //game.add.existing(this);


    this.body.addRectangle(61,82);

    //  Check for collisions
    this.body.onBeginContact.add(this.beginContact, this);
};

Barrel.prototype = Object.create(Phaser.Sprite.prototype);
Barrel.prototype.constructor = Barrel;

Barrel.prototype.update = function() {
  // write your prefab's specific update code here
};


Barrel.prototype.beginContact =  function(body, bodyB, shapeA, shapeB, equation) {

    //  The block hit something.
    //
    //  This callback is sent 5 arguments:
    //
    //  The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
    //  The p2.Body this Body is in contact with.
    //  The Shape from this body that caused the contact.
    //  The Shape from the contact body.
    //  The Contact Equation data array.
    //
    //  The first argument may be null or not have a sprite property, such as when you hit the world bounds.

    if (body !== null && body.sprite !== null && body.sprite.key == 'answerFrame')
    {
        console.log('booomm');
        this.playDestroyAnimation();
    }

};

Barrel.prototype.playDestroyAnimation = function() {
    // play animation
    myExplosion = game.add.sprite(this.x, this.y, 'smoke');
    myExplosion.scale.setTo(0.5);
    myExplosion.anchor.x = 0.5;
    myExplosion.anchor.y = 0.5;
    //myExplosion.animations.killOnComplete = true;

    myExplosionAnimation = myExplosion.animations.add('smoke');
    myExplosionAnimation.onComplete.add(this.destroyBox, this);
    myExplosionAnimation.play(10, false, true);
};


Barrel.prototype.destroyBox = function() {
    this.destroy();
};
