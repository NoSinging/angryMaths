var QuestionMark = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'frame');
    game.add.existing(this);
    game.physics.p2.enable(this);
    this.body.clearShapes();
    this.body.static=true;
    this.body.addRectangle(118,112, 0,0);
    this.scale.setTo(1.25,1.25); //TODO remove me!

};

QuestionMark.prototype = Object.create(Phaser.Sprite.prototype);
QuestionMark.prototype.constructor = QuestionMark;

QuestionMark.prototype.update = function() {
  // write your prefab's specific update code here
};

QuestionMark.prototype.fadeIn = function(duration) {
    questionMarkTween = game.add.tween(this);
    questionMarkTween.to( { alpha: 1 }, duration);
    questionMarkTween.start();
    return questionMarkTween;
};

QuestionMark.prototype.fadeOut = function(duration) {
    questionMarkTween = game.add.tween(this);
    questionMarkTween.to( { alpha: 0 }, duration);
    questionMarkTween.start();
    return questionMarkTween;
};

