angryMaths.playLevel = function() {
  };

angryMaths.playLevel.prototype = {
  	create: function(){

    	game.add.sprite(0, 0, 'background');

  		var questionsKey = 'questionsLevel' + game.levels.level;
		this.questionJSON = game.cache.getJSON(questionsKey);
		this.questions = this.questionJSON.questions;

		// sort questions according to order
		this.sortQuestions();

		this.options = [];
		this.stars = 0;
		this.currentQuestion = 0;
		this.currentQuestionAnswered = false;
		this.totalQuestions = this.questions.length;
		this.questionsCorrect = 0;
		this.questionsWrong = 0;
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
  		// progress outer
  		var timerBarOffsetY = 120;
  		this.timerBarBackground = game.add.image(40,timerBarOffsetY + 20, 'progressOuter');
  		// progress bar
  		this.timerBar = game.add.image(110,timerBarOffsetY + 36, 'progressBarGreen');
  		this.timeBarCropRect = new Phaser.Rectangle(0, 0, this.timerBar.width, this.timerBar.height);
  		this.timerBar.crop(this.timeBarCropRect);
  		this.timerBarWidth = this.timerBar.width;

  		// timer icon
  		this.timerIcon = game.add.image(0,timerBarOffsetY, 'timer');


        // create a question
	    this.question = new Question(this.game, 200, this.game.height/2);

	    // and add it to the game
	    this.game.add.existing(this.question);

	    //create the option for multiple choice
	    for(var i=0; i<=3; i++){
	    	// create the option button
			this.options[i] = game.add.button((game.width*(i+1)/5) - 60, 2*game.height/3,  "frame", this.questionAnswered, this);

		 	// create a child text object
		 	var text = game.add.bitmapText(20, 30,'raffic', '', 64);
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


  		// question progress outer
  		var questionBarOffsetY = 20;
  		this.questionBarBackground = game.add.image(40,questionBarOffsetY + 10, 'progressOuter');

  		// correct question icon
  		this.correctQuestionIcon = game.add.image(10,questionBarOffsetY, 'correct');
		this.correctQuestionIcon.scale.setTo(0.7,0.7);

	    // create cicles to show total questions
	    this.questionProgressXspacing = 300/this.totalQuestions;

	    //  Create our Timer
	    this.timer = game.time.create(false);

	    //  Set a TimerEvent to occur after configured seconds
	    this.timer.add(this.questionJSON.time*1000, this.levelFinished, this);

	    //  Start the timer
	    this.timer.start();

	    // audio
	    //this.coinSound = this.game.add.audio('coin');

	    // ask the first question
		this.askQuestion(this.currentQuestion);

        // navigation
        game.add.button(24, game.height - 160,  "menuGreen", this.menu, this);
	},
	update: function() {
		// if all the questions are answered then the level is finished
		if (this.currentQuestion == (this.totalQuestions -1) && this.currentQuestionAnswered && !this.isQuestionTransitioning()) {
			this.levelFinished();
			return;
		}

		// TODO: is this best here or in the questioned Answered method?
		if (this.currentQuestionAnswered && !this.isQuestionTransitioning()) {
			// ask the next question
			this.currentQuestionAnswered = false;
			this.currentQuestion++;
			this.askQuestion(this.currentQuestion);
		}

    	// update the timebar
    	this.timeBarCropRect.width = (this.timer.duration/(this.questionJSON.time*1000)) * this.timerBarWidth;
    	this.timerBar.updateCrop();
	},
	shutdown: function() {

	},
	sortOptions: function(questionNumber) {
		this.questions[questionNumber].a.sort(function (a, b) {
		  // randomise sorting or equal order
		  return (Math.random() < 0.5) ? -1:1;
		});
	},
	sortQuestions: function() {
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
	},
	askQuestion: function(questionNumber) {
	    // set the question text
	    this.question.setText(this.questions[questionNumber].q);
	    this.question.x = this.game.width / 2 - this.question.textWidth / 2;

	    // sort the options
	    this.sortOptions(questionNumber);

	    // set the options
	    for(var i=0; i<=3; i++){

	    	// set the correct answer
			this.options[i].correct = this.questions[questionNumber].a[i].correct;

		 	// set the text
		 	this.options[i].children[0].text = this.questions[questionNumber].a[i].option;
		 	// centre text in frame along x axis
    		this.options[i].children[0].x = this.options[i].width / 2 - this.options[i].children[0].textWidth / 2;
		}

	},
	questionAnswered: function(option) {
		// if a tick or cross is already in progress then ignore the answer
		if (this.isQuestionTransitioning()) {
			return;
		}

		if (option.correct) {
			this.questionsCorrect++;
			this.updateScore();
    		//this.coinSound.play();

		    //  Add tween  to tick
	    	this.tickTween = game.add.tween(this.tick).to( { alpha: 1 }, 300, "Linear", true, 0,0,true);

	    	// update graphic of answered questions
	    	this.progressIcon = game.add.image(80+(this.currentQuestion+1)*this.questionProgressXspacing,50, 'correct');
	    	this.progressIcon.scale.setTo(0.25,0.25);

            // mark as correctly answered
            this.questions[this.currentQuestion].answeredCorrectly = true;

		} else {
			this.questionsWrong++;
			
		    //  Add tween  to tick
	    	this.crossTween = game.add.tween(this.cross).to( { alpha: 1 }, 300, "Linear", true, 0,0,true);

	    	// update graphic of answered questions
	    	this.progressIcon = game.add.image(80+(this.currentQuestion+1)*this.questionProgressXspacing,50, 'wrong');
	    	this.progressIcon.scale.setTo(0.25,0.25);

            // mark as incorrectly answered
            this.questions[this.currentQuestion].answeredCorrectly = false;
		}
		this.currentQuestionAnswered = true;
		this.calculateStars();
	},
	levelFinished: function(){
		this.calculateStars();
		game.levels.levelFinished(this.stars);
		// back to level selection
		game.state.start("LevelOver");
	},
	isQuestionTransitioning: function(){
		return (typeof(this.tickTween) != 'undefined' && this.tickTween.isRunning) || (typeof(this.crossTween) != 'undefined' && this.crossTween.isRunning);
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
	},
    menu: function() {
        // going to level select state
        this.game.state.start('LevelSelect');
    }
}