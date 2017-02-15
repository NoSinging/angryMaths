
var ScoreBar = function(game, x, y, key, frame) {
    // The ScoreBar is a sprite, image is progress bar
    Phaser.Sprite.call(this, game, x, y, 'healthKitLarge');
    game.add.existing(this);

    // add child text, at index zero, later we'll add cargo at index 1
    this.FONT_SIZE = 60;
    this.levelScoreText = game.add.bitmapText(120, 20,'raffic', '', this.FONT_SIZE);
    this.addChild(this.levelScoreText,0);


    this.score = 0;
    this.updateScoreText();

};

ScoreBar.prototype = Object.create(Phaser.Sprite.prototype);
ScoreBar.prototype.constructor = ScoreBar;

ScoreBar.prototype.update = function() {
  // write prefab's specific update code here

};

ScoreBar.prototype.addToScore = function(boolenCorrectAnswer) {
    // update the score
    if (boolenCorrectAnswer) {
        this.score++;
    }
};


ScoreBar.prototype.updateScoreText = function() {
  // write prefab's specific update code here

    this.levelScoreText.text = this.score;
    if(this.scoreCargo) {
        this.scoreCargo.destroy(); // TODO: put this in a function of a fitting name
    }
};

ScoreBar.prototype.createScore = function(cargo, delay) {

    // hide the cargo in the answer
    cargo.alpha = 0.0;
    // create an image of the cargo initially located at cargo parent (the answer)
    this.scoreCargo = game.add.image(cargo.parent.x,cargo.parent.y, cargo.key);
    //TODO: why do I need to scale here to match the answer cargo?
    this.scoreCargo.scale.setTo(0.94,0.94);
    this.scoreCargo.anchor.x = 0.5;
    this.scoreCargo.anchor.y = 0.5;

    // set rotation same as cargo
    this.scoreCargo.rotation = cargo.parent.rotation % (2*Math.PI);

    game.add.existing(this.scoreCargo);
    //this.cargos.push(scoreCargo);

    // then move it to the score tray
    scoreCargoTween = game.add.tween(this.scoreCargo);
    targetX = this.x + 70;
    targetY = this.y + 40;
    scoreCargoTween.to( {x: targetX,  y: targetY, rotation: 0}, 500);
    scoreCargoTween.delay(delay);
    // when it's arrived update the score text
    scoreCargoTween.onComplete.add(this.updateScoreText,this);
    // start
    scoreCargoTween.start();

    // and scale it down as it moves to the tray
    scoreCargoScaleTween = game.add.tween(this.scoreCargo.scale);
    scoreCargoScaleTween.to({ x: .2, y: .2 }, 500);
    scoreCargoScaleTween.delay(delay);
    scoreCargoScaleTween.start();

    return scoreCargoScaleTween;
};
