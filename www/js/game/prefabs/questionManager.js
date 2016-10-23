
var QuestionManager = function(level,scoreBar) {

    var questionsKey = 'questionsLevel' + level;
    this.questionJSON = game.cache.getJSON(questionsKey);
    this.questions = this.questionJSON.questions;
    this.sortQuestions();

    this.questionStatus = 'COMPLETE';
    this.answers =  new Answers(this.questions);

    // create a question Mark physics body and set it in position on the question
    this.question = new Question(game, 100, 400);
    this.questionMark = new QuestionMark(game, 0,0);

    this.currentQuestion = -1;
    // make the scoreBar available to update the score
    this.scoreBar = scoreBar;

    this.initialiseCollisionGroup();
};

QuestionManager.prototype.initialiseCollisionGroup = function() {

    //  Create collision group for the answers &  question
    var blockCollisionGroup = game.physics.p2.createCollisionGroup();

    // add answers to collision group
    this.answers.setCollisionGroup(blockCollisionGroup);

    // add question mark to the collision group
    this.questionMark.body.setCollisionGroup(blockCollisionGroup);
    this.questionMark.body.collides(blockCollisionGroup, this.hitQuestion, this);
};

QuestionManager.prototype.setQuestion = function(questionNumber) {

        // set the question text
        this.question.setText(this.questions[questionNumber].q);

        // set the answer text
        this.answers.setAnswers(questionNumber);
};


QuestionManager.prototype.getAnswerBodies = function() {
    // get an array of the answer physics bodies
    return this.answers.getAnswerBodies();
};

QuestionManager.prototype.manageAnswerTransition = function(answer) {
    // manage the transitions of the answer
    // update the score: TODO
    this.scoreBar.addToScore(answer.isCorrect);

    // move the answer into place onto the question Mark
    answerMoveTween = answer.moveToSprite(this.questionMark);

    // & fade out the question mark
    questionMarkTween = this.questionMark.fadeOut();

    // reveal the cargo
    // first fade out the answer text
    answerTextTween = answer.fadeTextOut();
    answerTextTween.delay(1000);
    answerTextTween.start();

    // then reveal the cargo
    cargoTween = answer.fadeInCargo();
    cargoTween.delay(1500);
    cargoTween.start();

    // when the cargo is revealed create a score sprite
    cargoTween.onComplete.add(this.updateScore, this);
}

QuestionManager.prototype.updateScore = function(answer) {
    // update the score
    cargoToScoreTween = this.scoreBar.createScore(answer);

    // play all animations
    this.answers.playAnimation();

    // fade out all incorrect answers
    this.answers.fadeOutIncorrect();

    // pre-outro this question
    cargoToScoreTween.onComplete.add(this.preOutro, this);
}

QuestionManager.prototype.preOutro = function() {

    // move correct answer to position
    correctAnswerMoveTween = this.answers.moveCorrectAnswerToQuestionMark(this.questionMark);
    correctAnswerMoveTween.onComplete.add(this.outro, this);
}

QuestionManager.prototype.intro = function() {

    this.questionStatus = 'NOT_READY';

    // get the question and then set the questionMark object, in the place of the '?' question text.
    this.setQuestion(this.currentQuestion);
    this.question.setQuestionMark(this.questionMark);

    questionMarkTween = this.questionMark.fadeIn();
    //  When the intro transition completes update the status
    questionMarkTween.onComplete.add(this.onIntroComplete, this);

    // reset the answers
    this.answers.reset();
}


QuestionManager.prototype.outro = function() {

    questionMarkTween = this.questionMark.fadeOut();
    //  When the outro transition completes update the status
    questionMarkTween.onComplete.add(this.onOutroComplete, this);

    // fadeOut the answers
    this.answers.fadeOut();
}


QuestionManager.prototype.hitQuestion = function(body1, body2) {

    //  body1 is the question  (as it's the body that owns the callback)
    //  body2 is the body it impacted with, in this case our answer

    // only act on a hit if the question is ready.
    if (this.questionStatus != 'READY') {
        return;
    }

    // stop any further collision behaviour with the question Mark
    this.questionStatus = 'NOT_READY';

    // move the answer (body2) to the question Mark (body1)
    this.manageAnswerTransition(body2.sprite);
}

QuestionManager.prototype.onOutroComplete = function() {
    // restart the next question
    // TODO - check for last question and finish the level.
    this.questionStatus = 'COMPLETE';
}

QuestionManager.prototype.onIntroComplete = function() {
    this.questionStatus = 'READY';
}

QuestionManager.prototype.sortQuestions = function() {
    this.questions.sort(function (a, b) {
      if (Number(a.order) > Number(b.order)) {
        return 1;
      }
      if (Number(a.order) < Number(b.order)) {
        return -1;
      }
      // a must be equal to b
      // randomise sorting or equal order
      return (Math.random() < 0.5) ? -1:1;
    });
}
