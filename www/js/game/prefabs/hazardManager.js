var HazardManager = function(map) {

    // create a group for the barrels
    this.barrels = game.add.group();

    //create the barrels
    // Args:    layer in the map; object name in the layer; key for the image,
    //          frame; exists?; autocull; group; Custom Class; y-axis adjustment?
    map.createFromObjects('hazard', 'barrel', 'barrel', 0, true, false, this.barrels, Barrel, true);

};


HazardManager.prototype.setCollisionGroup = function(CollisionGroup) {

    this.barrels.forEach(function(item) {
        item.body.setCollisionGroup(CollisionGroup);
        item.body.collides([CollisionGroup]);
    });
};


