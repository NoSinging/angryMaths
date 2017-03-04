
var QuestionManager = function(level,scoreBar, lives, spawns) {

    var questionsKey = 'questionsLevel' + level;
    this.questionJSON = game.cache.getJSON(questionsKey);
    this.questions = this.questionJSON.questions;
    this.sortQuestions();

    this.answers =  new Answers(this.questions, spawns, scoreBar, lives);

    // create a question
    this.question = new Question(game, 400, 40);

    this.currentQuestion = 0;

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
    return this.answers.isCorrectlyAnswered();
};


QuestionManager.prototype.isLevelTimed = function(){
        return (this.questionJSON.mode == game.levels.TIMED);
};

QuestionManager.prototype.isLevelChallenge = function(){
        return (this.questionJSON.mode == game.levels.REVERSE);
};



QuestionManager.prototype.getAnswerBodies = function() {
    // get an array of the answer physics bodies
    return this.answers.getAnswerBodies();
};


QuestionManager.prototype.intro = function() {

    // get the question
    this.setQuestion(this.currentQuestion);

    // reset the answers
    this.answers.reset();
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
