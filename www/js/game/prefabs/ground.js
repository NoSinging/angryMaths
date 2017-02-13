var Ground = function(map) {

    //create the target layers.
    this.layer = map.createLayer('ground');

    //Before you can use the collide function you need to set what tiles can collide
    map.setCollisionBetween(1, 220, true, 'ground');

    // convert it into physics bodies
    this.bodies = game.physics.p2.convertTilemap(map, this.layer, true, true);

};

Ground.prototype.setCollisionGroup = function(CollisionGroup) {

        for (i = 0; i < this.bodies.length; i++) {
            this.bodies[i].setCollisionGroup(CollisionGroup);
            this.bodies[i].collides([CollisionGroup]);
        }
};

