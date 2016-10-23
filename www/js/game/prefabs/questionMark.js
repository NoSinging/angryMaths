var QuestionMark = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'answerFrame');
    game.add.existing(this);
    game.physics.p2.enable(this);
    this.body.clearShapes();
    this.body.static=true;
    this.body.addRectangle(118,112, 0,0);

};

QuestionMark.prototype = Object.create(Phaser.Sprite.prototype);
QuestionMark.prototype.constructor = QuestionMark;

QuestionMark.prototype.update = function() {
  // write your prefab's specific update code here
};

QuestionMark.prototype.fadeIn = function() {
    questionMarkTween = game.add.tween(this);
    questionMarkTween.to( { alpha: 1 }, 500);
    questionMarkTween.start();
    return questionMarkTween;
};

QuestionMark.prototype.fadeOut = function() {
    questionMarkTween = game.add.tween(this);
    questionMarkTween.to( { alpha: 0 }, 500);
    questionMarkTween.start();
    return questionMarkTween;
};

