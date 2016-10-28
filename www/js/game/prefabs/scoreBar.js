
var ScoreBar = function(game, x, y, key, frame) {
    // The ScoreBar is a sprite, image is progress bar
    Phaser.Sprite.call(this, game, x, y, 'progressOuter');
    game.add.existing(this);

    // Add the health kit icon
    this.healthKit = game.add.image(-20,0, 'healthKit');
    this.healthKit.scale.setTo(0.7,0.7)
    this.addChild(this.healthKit);

    // create an array of cargo items scored
    this.cargos = [];

    this.score = 0;
    this.totalWrong = 0;
};

ScoreBar.prototype = Object.create(Phaser.Sprite.prototype);
ScoreBar.prototype.constructor = HealthKit;

ScoreBar.prototype.update = function() {
  // write prefab's specific update code here
};

ScoreBar.prototype.addToScore = function(boolenCorrectAnswer) {
    // update the score
    if (boolenCorrectAnswer) {
        this.score++;
    } else {
        this.totalWrong++;
    }
};


ScoreBar.prototype.createScore = function(cargo) {

    // hide the cargo in the answer
    cargo.alpha = 0.0;
    // create an image of the cargo initially located at cargo parent (the answer)
    scoreCargo = game.add.image(cargo.parent.x,cargo.parent.y, cargo.key);
    scoreCargo.scale.setTo(0.75,0.75);
    scoreCargo.anchor.x = 0.5;
    scoreCargo.anchor.y = 0.5;
    game.add.existing(scoreCargo);
    this.cargos.push(scoreCargo);

    // then move it to the score tray
    scoreCargoTween = game.add.tween(scoreCargo);
    targetX = this.x + 70 + this.cargos.length * 25;
    targetY = this.y + 40;
    scoreCargoTween.to( {x: targetX,  y: targetY}, 500);
    scoreCargoTween.delay(500);
    scoreCargoTween.start();

    // and scale it down as it moves to the tray
    scoreCargoScaleTween = game.add.tween(scoreCargo.scale);
    scoreCargoScaleTween.to({ x: .2, y: .2 }, 500);
    scoreCargoScaleTween.delay(500);
    scoreCargoScaleTween.start();

    return scoreCargoScaleTween;
};
