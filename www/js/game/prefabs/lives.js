var Lives = function(game, x, y) {
    // The ScoreBar is a sprite, image is progress bar
    Phaser.Group.call(this, game);

    this.INITIAL_LIVES = 3;
    this.livesCount = this.INITIAL_LIVES;
    this.lifeSprites = [];

    for (var i = 0; i < this.INITIAL_LIVES; i++) {
        sprite = this.create(x + i*80, y, 'hearts', 0);
        this.lifeSprites.push(sprite);
    }

};

Lives.prototype = Object.create(Phaser.Group.prototype);
Lives.prototype.constructor = Lives;

Lives.prototype.update = function() {
  // write prefab's specific update code here

};


Lives.prototype.updateLives = function(boolenCorrectAnswer) {
    // update the score

    for (var i = 0; i < this.INITIAL_LIVES; i++) {
        frame = (i<this.livesCount) ? 0:1
        this.lifeSprites[i].frame = frame;
    }


    if(this.scoreCargo) {
        this.scoreCargo.destroy(); // TODO: put this in a function of a fitting name
    }

};


Lives.prototype.looseLife = function(cargo, delay) {


    this.livesCount--;

    // hide the cargo in the answer
    cargo.alpha = 0.0;
    // create an image of the cargo initially located at cargo parent (the answer)
    this.scoreCargo = game.add.image(cargo.parent.x,cargo.parent.y, cargo.key);
    //TODO: why do I need to scale here to match the answer cargo?
    this.scoreCargo.scale.setTo(0.94,0.94);
    this.scoreCargo.anchor.x = 0.5;
    this.scoreCargo.anchor.y = 0.5;
    game.add.existing(this.scoreCargo);

    // then move it to the score tray
    scoreCargoTween = game.add.tween(this.scoreCargo);
    targetX = this.lifeSprites[this.livesCount].x+30;
    targetY = this.lifeSprites[1].y+35;
    scoreCargoTween.to( {x: targetX,  y: targetY}, 500);
    scoreCargoTween.delay(delay);
    // when it's arrived update the score text
    scoreCargoTween.onComplete.add(this.updateLives,this);
    // start
    scoreCargoTween.start();

    // and scale it down as it moves to the tray
    scoreCargoScaleTween = game.add.tween(this.scoreCargo.scale);
    scoreCargoScaleTween.to({ x: .2, y: .2 }, 500);
    scoreCargoScaleTween.delay(delay);
    scoreCargoScaleTween.start();

    return scoreCargoScaleTween;
};
