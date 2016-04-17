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
		this.STAR1 = this.questionJSON.rating[0];
		this.STAR2 = this.questionJSON.rating[1];
		this.STAR3 = this.questionJSON.rating[2];

		// showing level title
		this.style = {
			font: "32px Arial",
			fill: "#fff000"
		};
		// var levelTitle = game.add.bitmapText(0, 0,'raffic', 'level '+game.levels.level, 32);
  //       levelTitle.x = (game.width - levelTitle.width) / 2;

  		// create a timer bar
  		this.timerBar = game.add.image(20,120, 'preloadbar');
  		this.timeBarCropRect = new Phaser.Rectangle(0, 0, this.timerBar.width, this.timerBar.height);
  		this.timerBar.crop(this.timeBarCropRect);

		// create a Score
  		this.scoreIcon = game.add.image(20,60, 'correct');
  		this.scoreIcon.scale.setTo(0.5,0.5);
  		this.scoreText = game.add.bitmapText(0, 0,'raffic', '0', 64);
		this.scoreIcon.addChild(this.scoreText);


        // create a question
	    this.question = new Question(this.game, 200, this.game.height/4);
	    // and add it to the game
	    this.game.add.existing(this.question);

	    //create the option for multiple choice
	    for(var i=0; i<=3; i++){
	    	// create the option button
			this.options[i] = game.add.button(game.width*(i+1)/5, 2*game.height/3,  "blank", this.questionAnswered, this);

		 	// create a child text object
		 	//var text = game.add.text(0, 0, '', this.style);
		 	var text = game.add.bitmapText(0, 0,'raffic', '', 64);
		 	this.options[i].addChild(text);
		}

		// Create the correct tick
	    this.tick = new Tick(this.game, 200, this.game.height/3);
    	this.tick.alpha = 0;
	    // and add it to the game
	    this.game.add.existing(this.tick);

		// Create the incorrect cross
	    this.cross = new Cross(this.game, 200, this.game.height/3);
    	this.cross.alpha = 0;
	    // and add it to the game
	    this.game.add.existing(this.cross);



	    //  Create our Timer
	    this.timer = game.time.create(false);

	    //  Set a TimerEvent to occur after 12 seconds
	    this.timer.add(this.questionJSON.time*1000, this.levelFinished, this);

	    //  Start the timer
	    this.timer.start();

	    // audio
	    this.coinSound = this.game.add.audio('coin');
	    this.deathSound = this.game.add.audio('death');

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

    	//game.debug.text('Time left: ' + (this.timer.duration/1000).toFixed(0), 32, 64);
    	//game.debug.text('Questions correct: ' + this.questionsCorrect, 32, 96);
    	//game.debug.text('Stars: ' + this.stars, 32, 128);

    	// update the timebar
    	this.timeBarCropRect.width = (this.timer.duration/(this.questionJSON.time*1000)) * 256;
    	this.timerBar.updateCrop();
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

	},
	questionAnswered: function(option) {
		if (option.correct) {
			this.questionsCorrect++;
			this.updateScore();
    		this.coinSound.play();

		    //  Add tween  to tick 
	    	this.tickTween = game.add.tween(this.tick).to( { alpha: 1 }, 200, "Linear", true, 0,0,true);
		} else {
		    //  Add tween  to tick 
	    	this.crossTween = game.add.tween(this.cross).to( { alpha: 1 }, 200, "Linear", true, 0,0,true);
		}
		this.currentQuestionAnswered = true;
    	this.scoreText.text = this.questionsCorrect.toFixed(0);
		this.calculateStars();
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
		if (this.score >= this.STAR3) {
			this.stars = 3;
		} else if (this.score >= this.STAR2) {
			this.stars = 2;
		} else
		if (this.score >= this.STAR1) {
			this.stars = 1;
		} else
		{
			this.stars = 0;
		}
	},
	getQuestionScore: function(){
		//
		var questionScore = 1;

		return questionScore;
	},
	tickCompleted: function(){
	    //
    	this.tick.alpha = 0.1;
	}
}