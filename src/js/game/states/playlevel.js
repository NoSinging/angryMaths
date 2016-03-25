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

		// showing level title
		this.style = {
			font: "32px Arial",
			fill: "#ffffff"
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
			this.stars++;
		}
		this.currentQuestionAnswered = true;

	},
	levelFinished: function(){
		game.levels.levelFinished(this.stars);
		// back to level selection
		game.state.start("LevelSelect");
	}
}