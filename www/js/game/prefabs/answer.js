var Answer = function(game, x, y) {

    Phaser.Sprite.call(this, game, this.initialX, this.initialY, 'answerFrame');
    game.physics.p2.enable(this);
    game.add.existing(this);

    scale = 1.25;
    this.scale.setTo(scale,scale);
    this.body.clearShapes();
    this.body.addRectangle(118*scale,112*scale);

    this.alpha = 0;
    this.isCorrect = false;

    this.FONT_SIZE = 76;
    // add child text, at index zero, later we'll add cargo at index 1
    this.answerTextChild = game.add.bitmapText(0, -30,'raffic', '', this.FONT_SIZE);
    this.addChild(this.answerTextChild,0);

    // the cargo (healthkit or bomb) as a child
    this.cargo;

};

Answer.prototype = Object.create(Phaser.Sprite.prototype);
Answer.prototype.constructor = Answer;

Answer.prototype.update = function() {
  // write your prefab's specific update code here
};

Answer.prototype.setText = function(text) {
    // update text, scale it to fit and centre is on x axis
    textScaleRatio = 1.0;
    maxTextWidth = 100.0;

    this.answerTextChild.text = text;
    // and scale it down to fit into the frame if it's too big
    if (this.answerTextChild.width > maxTextWidth)  {
        textScaleRatio = maxTextWidth/this.answerTextChild.width;
    }

    this.answerTextChild.scale.setTo(textScaleRatio, textScaleRatio)
    this.answerTextChild.x = -this.answerTextChild.width/2;
};

Answer.prototype.setCargo = function(cargo) {
    // add the cargo (healthkit or bomb) as a child);
    // first remove any existing cargo
    if (this.children.length > 1) {
        this.removeChildAt(1)
    }

    // then add new cargo
    this.cargo = cargo;
    this.addChild(this.cargo,1);
    this.hideCargo();
};

Answer.prototype.fadeIn = function(duration) {
    answerTween = game.add.tween(this);
    answerTween.to( { alpha: 1 }, duration);
    answerTween.start();
    return answerTween;
};

Answer.prototype.fadeOut = function(duration) {
    answerTween = game.add.tween(this);
    answerTween.to( { alpha: 0 }, duration);
    answerTween.start();
    return answerTween;
};

Answer.prototype.fadeTextOut = function(duration) {
    answerTextTween = game.add.tween(this.answerTextChild);
    answerTextTween.to( { alpha: 0 }, duration);
    return answerTextTween;
};

Answer.prototype.reset = function(x,y) {
    this.fadeIn();
    this.body.x = x;
    this.body.y = y;

    //reset physics to allow movement
    this.body.static=false;

    //reset the question to show
    this.showText();

    // reset the cargo to hide
    this.hideCargo();
};

Answer.prototype.fadeInCargo = function(duration) {
    tween = game.add.tween(this.cargo);
    tween.to( { alpha: 1 }, duration);
    return tween;
};

Answer.prototype.hideCargo = function() {
    this.cargo.alpha = 0.0;
};

Answer.prototype.showText = function() {
    this.answerTextChild.alpha = 1.0;
};

Answer.prototype.moveToSprite = function(targetSprite, duration) {
    // stop it
    this.body.setZeroVelocity();
    this.body.setZeroRotation();
    this.body.static=true;

    // centre it and rotate it onto the destinationSprite
    // reset rotation to be moduli of 360 degrees to avoid multiple revolutions
    this.body.rotation %= 2*Math.PI;
    tween = game.add.tween(this.body);
    tween.to( { y: targetSprite.body.y, x: targetSprite.body.x, rotation: targetSprite.body.rotation}, duration);
    return tween;
};
