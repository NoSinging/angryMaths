angryMaths.playLevel = function() {
  };

angryMaths.playLevel.prototype = {
  	create: function(){

  		var questionsKey = 'questionsLevel' + game.levels.level;
		this.questionJSON = game.cache.getJSON(questionsKey);

		this.options = [];
		this.stars = 0;
		this.currentQuestion = -1;
		this.currentQuestionAnswered = true;
		this.totalQuestions = this.questionJSON.questions.length;
		this.questionsCorrect = 0;
		this.score = 0;
		this.SLOW = 5000;
		this.FAST = 2500;
		//this.SUPERFAST = 1500;

		// showing level title
		this.style = {
			font: "32px Arial",
			fill: "#fff000"
		};
		var levelTitle = game.add.text(0,0,"PLAYING LEVEL "+game.levels.level,this.style);
		levelTitle.align = "center";
        levelTitle.x = (game.width - levelTitle.width) / 2;

         // create a question
	    this.question = new Question(this.game, 200, this.game.height/4);
	    // and add it to the game
	    this.game.add.existing(this.question);

	    //create the option for multiple choice
	    for(var i=0; i<=3; i++){
	    	// create the option button
			this.options[i] = game.add.button(game.width/2, 90*(i+1), "logo", this.questionAnswered, this);

		 	// create a child text object
		 	var text = game.add.text(0, 0, '', this.style);
		 	this.options[i].addChild(text);
		}

	    //  Create our Timer
	    this.timer = game.time.create(false);

	    //  Set a TimerEvent to occur after 12 seconds
	    this.timer.add(12000, this.levelFinished, this);

	    //  Start the timer
	    this.timer.start();

	    //  Create our individual question Timer
	    this.questionTimer = game.time.create(false);

	    //  Start the timer
	    this.questionTimer.start();
	    this.questionStartTime = this.questionTimer.ms;

	},
	update: function() {
		// if all the questions are answered then the level is finished
		if (this.currentQuestion == (this.totalQuestions -1) && this.currentQuestionAnswered) {
			this.levelFinished();
			return;
		}

		// TODO: is this best here or in the questioned Answered method?
		if (this.currentQuestionAnswered) {
			// ask the next question
			this.currentQuestionAnswered = false;
			this.currentQuestion++;
			this.askQuestion(this.currentQuestion);
		}

    	game.debug.text('Time until event: ' + this.timer.duration.toFixed(0), 32, 32);
    	game.debug.text('Score: ' + this.score, 32, 64);
    	game.debug.text('Questions correct: ' + this.questionsCorrect, 32, 96);
    	game.debug.text('Question time: ' + this.getQuestionElaspedTime(), 32, 128);
    	game.debug.text('Running Stars: ' + this.score/this.totalQuestions, 32, 160);
	},
	shutdown: function() {

	},
	askQuestion: function(questionNumber) {
	    // set the question text
	    this.question.setText(this.questionJSON.questions[questionNumber].q);

	    // set the options
	    for(var i=0; i<=3; i++){

	    	// set the correct answer
			this.options[i].correct = this.questionJSON.questions[questionNumber].a[i].correct;

		 	// set the text
		 	this.options[i].children[0].text = this.questionJSON.questions[questionNumber].a[i].option;
		}

	    this.questionStartTime = this.questionTimer.ms;

	},
	questionAnswered: function(option) {
		if (option.correct) {
			this.questionsCorrect++;
			this.updateScore();
		}
		this.currentQuestionAnswered = true;
	},
	levelFinished: function(){
		this.calculateStars();
		game.levels.levelFinished(this.stars);
		// back to level selection
		game.state.start("LevelSelect");
	},
	updateScore: function(){
		//
		this.score += this.getQuestionScore();
	},
	calculateStars: function(){
		//
		this.stars = Math.round(this.score/this.totalQuestions);
	},
	getQuestionElaspedTime: function(){
		//
		return (this.questionTimer.ms - this.questionStartTime);
	},
	getQuestionScore: function(){
		//
		var questionScore = 0;
		// score is real time
		// score is zero for incorrect answer
		// score is higher for faster answer
		// 1 point for slow answer
		// 2 points for fast answer
		// 3 points for super fast answer
		if (this.getQuestionElaspedTime() > this.SLOW) {
			questionScore = 1;
		} else if (this.getQuestionElaspedTime() > this.FAST) {
			questionScore = 2;
		} else {
			questionScore = 3;
		}

		return questionScore;
	}
}