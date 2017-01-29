var Box = function(game,x,y,id) {

    Phaser.Sprite.call(this, game, x, y, 'woodenBox',0);
    game.physics.p2.enable(this);
    game.add.existing(this);

    this.sequence = id;
    this.hits=0;
    // this.damageThreshold1 = 5;
    // this.damageThreshold2 = 10;
    // this.damageLevel=0;


            //  Check for the block hitting the target
            this.body.onBeginContact.add(this.beginContact, this);
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


Box.prototype.getDamage = function() {
    // Damage is 0, 1, 2, 3
    //return Math.min(Math.floor(this.hits / 2), 3);
    return Math.min(this.hits, 3);
};

Box.prototype.beginContact =  function(body, bodyB, shapeA, shapeB, equation) {

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
        this.hits++;
        console.log('frame: ' + this.frame);
        console.log('damage: ' + this.getDamage());
        this.frame = this.getDamage();
        console.log('box: ' + this.sequence + ' ,number of answer hits: ' + this.hits);
    }

    if (this.getDamage() > 2) {
        this.playDestroyAnimation();
    }
};

Box.prototype.playDestroyAnimation = function() {
    // play animation
    myExplosion = game.add.sprite(this.x, this.y, 'explosion');
    myExplosion.scale.setTo(0.2);
    myExplosion.anchor.x = 0.5;
    myExplosion.anchor.y = 0.5;
    //myExplosion.animations.killOnComplete = true;

    myExplosionAnimation = myExplosion.animations.add('explosion');
    myExplosionAnimation.onComplete.add(this.destroyBox, this);
    myExplosionAnimation.play(10, false, true);
};


Box.prototype.destroyBox = function() {
    this.destroy();
};

