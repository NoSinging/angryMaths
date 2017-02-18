var Target = function(map) {

    //create the target layers.
    this.layer = map.createLayer('target');

    //Before you can use the collide function you need to set what tiles can collide
    map.setCollisionBetween(1, 220, true, 'target');

    // convert it into physics bodies
    this.bodies = game.physics.p2.convertTilemap(map, this.layer);

    // set the key, which we'll use in collision testing later
    this.key = 'target';
};

Target.prototype.setCollisionGroup = function(CollisionGroup) {

        for (i = 0; i < this.bodies.length; i++) {
            this.bodies[i].setCollisionGroup(CollisionGroup);
            this.bodies[i].collides([CollisionGroup]);
            // Create reference to Target object from physics body to check collisions
            this.bodies[i].parent = this;
        }
};

