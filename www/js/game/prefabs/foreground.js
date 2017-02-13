var Foreground = function(map) {

    //create the target layers.
    this.layer = map.createLayer('foreground');

    //Before you can use the collide function you need to set what tiles can collide
    map.setCollisionBetween(1, 220, true, 'foreground');

    // convert it into physics bodies
    this.bodies = game.physics.p2.convertTilemap(map, this.layer);

};

Foreground.prototype.setCollisionGroup = function(CollisionGroup) {

        for (i = 0; i < this.bodies.length; i++) {
            this.bodies[i].setCollisionGroup(CollisionGroup);
            this.bodies[i].collides([CollisionGroup]);
        }
};

