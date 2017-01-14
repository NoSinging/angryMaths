
var QuestionManager = function(level,scoreBar, lives) {

    var questionsKey = 'questionsLevel' + level;
    this.questionJSON = game.cache.getJSON(questionsKey);
    this.questions = this.questionJSON.questions;
    this.sortQuestions();

    this.questionStatus = 'COMPLETE';
    this.answers =  new Answers(this.questions);

    // create a question
    this.question = new Question(game, 400, 40);

    this.currentQuestion = -1;
    // make the scoreBar available to update the score
    this.scoreBar = scoreBar;
    this.lives = lives;

    this.transitionTime = 350;

};

QuestionManager.prototype.initialiseCollisionGroup = function(collisionGroup) {


    // add answers to collision group
    this.answers.setCollisionGroup(collisionGroup);

};

QuestionManager.prototype.setQuestion = function(questionNumber) {

        // set the question text
        this.question.setText(this.questions[questionNumber].q);
        this.question.setX();

        // set the answer text
        this.answers.setAnswers(questionNumber);
};

QuestionManager.prototype.isLevelFinished = function() {
    return (this.isQuestionComplete() && this.isLastQuestion());
};

QuestionManager.prototype.isLastQuestion = function() {
    return (this.currentQuestion == this.questions.length-1);
};

QuestionManager.prototype.isQuestionComplete = function() {
    return (this.questionStatus == 'COMPLETE');
};


QuestionManager.prototype.getAnswerBodies = function() {
    // get an array of the answer physics bodies
    return this.answers.getAnswerBodies();
};


QuestionManager.prototype.updateScore = function(answer) {

    // update the score
    this.scoreBar.addToScore(answer.isCorrect);
    // tween the cargo
    cargoToScoreTween = this.scoreBar.createScore(answer.cargo, this.transitionTime);

}


QuestionManager.prototype.updateLives = function(answer) {

    // update the score
    //this.lives.updateLives(answer.isCorrect);
    // tween the cargo
    cargoToLifeTween = this.lives.looseLife(answer.cargo, this.transitionTime);

}

QuestionManager.prototype.intro = function() {

    // get the question
    this.setQuestion(this.currentQuestion);

    this.questionStatus = 'READY';

    // reset the answers
    this.answers.reset();
}



QuestionManager.prototype.answered = function(answer) {

    answer.answered();

    if (answer.status == 'COMPLETE' && answer.isCorrect) {
        this.updateScore(answer);
        this.questionStatus = 'COMPLETE';
    }


    if (answer.status == 'COMPLETE' && !answer.isCorrect) {
        this.updateLives(answer);
    }


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
