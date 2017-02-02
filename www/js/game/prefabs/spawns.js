var Spawns = function(map) {

    this.spawnPoints = [];

    //create the spawn points
    map.objects.Spawn.forEach(this.addSpawnPoint, this);

};


Spawns.prototype.addSpawnPoint = function(element, index, array) {
        spawnPoint = new Phaser.Point(element.x, element.y);
        this.spawnPoints.push(spawnPoint);
};
