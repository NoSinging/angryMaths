var Answers = function(questions, spawns, scoreBar, lives) {

    // spawn points for the answers
    this.spawnPoints = spawns.spawnPoints;

    // array of answers
    this.answers = [];
    for (i = 0; i < this.spawnPoints.length; i++) {
        this.answers.push(new Answer(game, this.spawnPoints[i].x, this.spawnPoints[i].y));
        this.answers[i].setScoreBar(scoreBar);
        this.answers[i].setLives(lives);

    }

    this.questions = questions;
    this.correctAnswer;
};

Answers.prototype.setCollisionGroup = function(CollisionGroup) {

    for (i = 0; i < this.answers.length; i++) {
        this.answers[i].body.setCollisionGroup(CollisionGroup);
        this.answers[i].body.collides([CollisionGroup]);
    }
};


Answers.prototype.setAnswers = function(questionNumber) {

        for (i = 0; i < this.answers.length; i++) {
            // set the answer text
            this.answers[i].setText(this.questions[questionNumber].a[i].option);

            // record the correct Answer in the answers object
            // record the answer as correct or incorrect
            // create the answer cargo - a healthKit or Bomb
            if (this.questions[questionNumber].a[i].correct) {
                cargo = new HealthKit(game);
                this.answers[i].isCorrect = true;
                this.correctAnswer = this.answers[i];
            } else {
                this.answers[i].isCorrect = false;
                cargo = new Bomb(game);
            }

            this.answers[i].setCargo(cargo);
        }
};

Answers.prototype.getAnswerBodies = function() {

    // get an array of the answer physics bodies
    answerBodies = [];

    for (i = 0; i < this.answers.length; i++) {
        answerBodies.push(this.answers[i].body);
    }

    return answerBodies;
};

Answers.prototype.playAnimation = function() {

    // play all animations
    for (i = 0; i < this.answers.length; i++) {
        this.answers[i].cargo.playAnimation();
    }
};

Answers.prototype.fadeOutIncorrect = function(duration) {

    for (i = 0; i < this.answers.length; i++) {
        if (!this.answers[i].isCorrect) {
            this.answers[i].fadeOut(duration);
        }
    }
};

Answers.prototype.reset = function() {
    // Shuffle the spawn points
    shuffledSpawnPoints = this.randomiseArray(this.spawnPoints);

    // reset the position
    for (i = 0; i < this.answers.length; i++) {
        this.answers[i].reset(shuffledSpawnPoints[i].x, shuffledSpawnPoints[i].y);
    }

};

Answers.prototype.randomiseArray = function(array) {
        tmpArray = []
        for (i = 0; i < array.length; i++) {
            tmpArray.push(array[i]);
        }

        tmpArray.sort(function (a, b) {
          return (Math.random() < 0.5) ? -1:1;
        });
        return tmpArray;
    },


Answers.prototype.fadeOut = function(duration) {

    for (i = 0; i < this.answers.length; i++) {
        this.answers[i].fadeOut(duration);
    }

};

Answers.prototype.isCorrectlyAnswered = function() {
    return this.correctAnswer.status == 'DEAD';
};



