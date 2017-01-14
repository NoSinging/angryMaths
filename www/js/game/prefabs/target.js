var Target = function(map) {

    //create the target layers.
    this.layer = map.createLayer('target');

    //Before you can use the collide function you need to set what tiles can collide
    map.setCollisionBetween(1, 220, true, 'target');

    // convert it into physics bodies
    this.bodies = game.physics.p2.convertTilemap(map, this.layer);

    // Can I assume this will always be a singular???
    // remove me - this here as a quick fix to allow the correct answer move function
    this.body = this.bodies[0];
    //
    this.isBodyTouching = false;
    this.bodyTouching = null;

};

Target.prototype.setCollisionGroup = function(CollisionGroup) {

        for (i = 0; i < this.bodies.length; i++) {
            this.bodies[i].setCollisionGroup(CollisionGroup);
            this.bodies[i].collides([CollisionGroup]);

            //  Check for the block hitting the target
            this.bodies[i].onBeginContact.add(this.beginContact, this);
            //  Check for the block leaving the target
            this.bodies[i].onEndContact.add(this.endContact, this);

        }
};


Target.prototype.beginContact =  function(body, bodyB, shapeA, shapeB, equation) {

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
        this.bodyTouching  = body.sprite;
        this.isBodyTouching=true;
    }
};
Target.prototype.endContact =  function(body, bodyB, shapeA, shapeB, equation) {

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
        this.bodyTouching=null;
        this.isBodyTouching=false;
    }
};
