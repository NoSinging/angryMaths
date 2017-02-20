var Answer = function(game, x, y) {

    Phaser.Sprite.call(this, game, this.initialX, this.initialY, 'answerFrame');
    game.physics.p2.enable(this);
    game.add.existing(this);

    this.body.clearShapes();
    this.body.addRectangle(89,84);


    //  Check for the block hitting the target
    this.body.onBeginContact.add(this.beginContact, this);
    //  Check for the block leaving the target
    this.body.onEndContact.add(this.endContact, this);


    // make the scoreBar available to update the score
    this.scoreBar;
    this.lives;

    this.isOnTarget = false;

    this.alpha = 0;
    this.isCorrect = false;

    this.FONT_SIZE = 60;
    // add child text, at index zero, later we'll add cargo at index 1
    this.answerTextChild = game.add.bitmapText(0, -30,'raffic', '', this.FONT_SIZE);
    this.addChild(this.answerTextChild,0);

    this.transitionTime = 350;

    // the cargo (healthkit or bomb) as a child
    this.cargo;

    this.touchConstraint;

    // answer status
    // READY ... ready to take part in game
    // TRANSITION ... answer is being processed and tween started
    // COMPLETE ... answer is complete and tweening is complete
    // DEAD .... answer has been removed from the game
    this.status = 'READY'; // READY, TRANSITION, COMPLETE, DEAD
};

Answer.prototype = Object.create(Phaser.Sprite.prototype);
Answer.prototype.constructor = Answer;

Answer.prototype.update = function() {
        // test ... is this answer on a target, ready & static ... if so it's answered.
        if (this.isOnTarget && this.status == 'READY') {
            speed = this.distance([0,0],[this.body.velocity.x, this.body.velocity.y]);
            if (speed < 1) {
                this.answered();
                }
        }


    if (this.status == 'COMPLETE' && this.isCorrect) {
        this.status = 'DEAD';

        // update the score
        this.scoreBar.addToScore(this.isCorrect);
        // tween the cargo to the score bar
        cargoToScoreTween = this.scoreBar.createScore(this.cargo, this.transitionTime);

    }


    if (this.status == 'COMPLETE' && !this.isCorrect) {
        this.status = 'DEAD';

        // tween the cargo to the lives bar
        cargoToLifeTween = this.lives.looseLife(this.cargo, this.transitionTime);
    }

};

Answer.prototype.setText = function(text) {
    // update text, scale it to fit and centre is on x axis
    maxTextWidth = 92.0;

    this.answerTextChild.text = text;
    // and scale it down to fit into the frame if it's too big
    if (this.answerTextChild.width > maxTextWidth)  {
        textScaleRatio = maxTextWidth/this.answerTextChild.width;
        this.answerTextChild.scale.setTo(textScaleRatio, textScaleRatio);
    }

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


Answer.prototype.answered = function() {

    //only act on a hit if the answer is ready.
    if (this.status != 'READY') {
        return;
    }

    this.release();

    //stop any further collision behaviour
    this.status = 'TRANSITION';

    // reveal the cargo
    // first fade out the answer text
    answerTextTween = this.fadeTextOut(this.transitionTime);
    answerTextTween.delay(this.transitionTime);
    answerTextTween.start();

    // then reveal the cargo
    cargoTween = this.fadeInCargo(this.transitionTime);
    cargoTween.delay(this.transitionTime*2);
    cargoTween.onComplete.add(this.outro, this);
    cargoTween.start();


}

Answer.prototype.outro = function() {

    //  if it's incorrect then
    //  animate the explosion
    //  remove the answer
    //  keep going
    if (this.isCorrect) {
        this.status = 'COMPLETE';
    } else {
        // remove from world before animation
        this.body.removeFromWorld();
        this.cargo.playAnimation();
        this.fadeOut();
        this.status = 'COMPLETE';
    }
}

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

    this.status = 'READY';
    this.isOnTarget=false;
    this.fadeIn();

    // add the answer body back into the world
    this.body.addToWorld();

    this.body.x = x;
    this.body.y = y;
    this.body.rotation = 0;


    //reset physics to allow movement
    this.body.static=false;


    // reset the cargo to hide
    this.hideCargo();


    //reset the question to show
    this.showText();
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

Answer.prototype.setScoreBar = function(scoreBar) {
    this.scoreBar = scoreBar;
};


Answer.prototype.setLives = function(lives) {
    this.lives = lives;
};


Answer.prototype.setTouchConstraint = function(touchConstraint) {
    this.touchConstraint = touchConstraint;
};

Answer.prototype.release = function() {

        // release the answers from any touch/mouse holed by removing constraint from object's body
        game.physics.p2.removeConstraint(this.touchConstraint);

};

Answer.prototype.beginContact =  function(body, bodyB, shapeA, shapeB, equation) {
    //  The block hit something.
    //
    //  This callback is sent 5 arguments:
    //
    //  The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
    //  The p2.Body this Body is in contact with.
    //  The Shape from this body that caused the contact.
    //  The Shape from the contact body.
    //  The Contact Equation data array.
    //
    //  The first argument may be null or not have a sprite property, such as when you hit the world bounds.
    if (body !== null && body.parent !== null && typeof body.parent !== 'undefined' && body.parent.key == 'target')
    {
        this.isOnTarget=true;
    }
};
Answer.prototype.endContact =  function(body, bodyB, shapeA, shapeB, equation) {

    //  The block hit something.
    //
    //  This callback is sent 5 arguments:
    //
    //  The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
    //  The p2.Body this Body is in contact with.
    //  The Shape from this body that caused the contact.
    //  The Shape from the contact body.
    //  The Contact Equation data array.
    //
    //  The first argument may be null or not have a sprite property, such as when you hit the world bounds.

    if (body !== null && body.parent !== null && typeof body.parent !== 'undefined' && body.parent.key == 'target')
    {
        this.isOnTarget=false;
    }
};

Answer.prototype.distance = function(a,b) {

    return Math.sqrt(Math.pow((a[0]-b[0]),2) + Math.pow((a[1]-b[1]),2));

};

