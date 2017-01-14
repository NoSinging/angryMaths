var BoxManager = function(map) {

    // create boxes
    this.boxes = [];

    //create the target layers.
    this.layer = map.createLayer('box');

    //Before you can use the collide function you need to set what tiles can collide
    map.setCollisionBetween(1, 220, true, 'box');

    // TODO: Is this most efficient way to create the box physics bodies?
    this.boxTiles = this.layer.getTiles(0,0,1334,750, true);

    for (i = 0; i < this.boxTiles.length; i++) {
        tile = this.boxTiles[i];
        this.boxes.push(new Box(game, tile.worldX+tile.centerX, tile.worldY+tile.centerY));
        map.removeTile(tile.x, tile.y, 'box');
    }
};


BoxManager.prototype.setCollisionGroup = function(CollisionGroup) {

        for (i = 0; i < this.boxes.length; i++) {
            this.boxes[i].setCollisionGroup(CollisionGroup);
            this.boxes[i].collides([CollisionGroup]);

        }
};

