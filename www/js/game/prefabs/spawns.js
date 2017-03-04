var Spawns = function(map) {

    this.spawnPoints = [];

    //create the spawn points
    map.objects.Spawn.forEach(this.addSpawnPoint, this);

    //randomise spawn points
    this.randomiseSpawnPoint();
};

Spawns.prototype.addSpawnPoint = function(element, index, array) {
        // centre spawn point co-ords on the answer.
        spawnPoint = new Phaser.Point(element.x+45, element.y-45);
        this.spawnPoints.push(spawnPoint);
};

Spawns.prototype.randomiseSpawnPoint = function() {
    this.spawnPoints.sort(function (a, b) {
      return (Math.random() < 0.5) ? -1:1;
    });
};
