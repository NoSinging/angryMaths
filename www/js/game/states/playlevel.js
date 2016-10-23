angryMaths.playLevel = function() {
		var mouseBody;
		var mouseConstraint;
		var questionManager;
		var scoreBar;
  };

angryMaths.playLevel.prototype = {
  	create: function(){

    	game.add.sprite(0, 0, 'background');

	    // create the score tray
	    this.scoreBar = new ScoreBar(game, 40,20);

	    // create a single question manager
	    this.questionManager = new QuestionManager(game.levels.level, this.scoreBar);

	    //  objects with their own collision groups to  collide with the world bounds
	    //  what this does is adjust the bounds to use its own collision group.
	    game.physics.p2.updateBoundsCollisionGroup();

	    // create physics body for mouse which we will use for dragging clicked bodies
	    // TODO best placed here or at world set up?
	    this.mouseBody = new p2.Body();
	    game.physics.p2.world.addBody(this.mouseBody);

	    // attach pointer events, max 1 point to save confusion on touch devices
	    game.input.maxPointers = 1;
	    game.input.onDown.add(this.click, this);
	    game.input.onUp.add(this.release, this);
	    game.input.addMoveCallback(this.move, this);

		// TODO: is the required?
		// sort questions according to order
		//this.sortQuestions();

		this.stars = 0;


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

	    //  Create our Timer
	    this.timer = game.time.create(false);

	    //  Set a TimerEvent to occur after configured seconds
	    //TODO read time from JSON
	    this.timer.add(this.questionManager.questionJSON.time*1000, this.levelFinished, this);

	    //  Start the timer
	    this.timer.start();

        // navigation
        game.add.button(game.width - 160, 40,  "menuGreen", this.menu, this);

	},
	update: function() {

		//TODO: stop pocking into the internals of questionManager
		if (this.questionManager.questionStatus == 'COMPLETE'){
		    // release any touch holds on answers
		    // TODO check this on a touch device
		    this.release();
		    // start the next question
		    this.questionManager.currentQuestion++;
		    this.questionManager.intro();
		}

    	// update the timebar
    	// TODO time from JSON
    	this.timeBarCropRect.width = (this.timer.duration/(this.questionManager.questionJSON.time*1000)) * this.timerBarWidth;
    	this.timerBar.updateCrop();
	},
	shutdown: function() {

	},
	// sortOptions: function(questionNumber) {
	// 	this.questions[questionNumber].a.sort(function (a, b) {
	// 	  // randomise sorting or equal order
	// 	  return (Math.random() < 0.5) ? -1:1;
	// 	});
	// },
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
	levelFinished: function(){
		this.calculateStars();
		game.levels.levelFinished(this.stars);
		// back to level selection
		game.state.start("LevelOver");
	},
	calculateStars: function(){
		STAR1 = this.questionManager.questionJSON.rating[0];
		STAR2 = this.questionManager.questionJSON.rating[1];
		STAR3 = this.questionManager.questionJSON.rating[2];

		if (this.scoreBar.score >= STAR3) {
			this.stars = 3;
		} else if (this.scoreBar.score >= STAR2) {
			this.stars = 2;
		} else
		if (this.scoreBar.score >= STAR1) {
			this.stars = 1;
		} else
		{
			this.stars = 0;
		}
	},
    menu: function() {
        // going to level select state
        this.game.state.start('LevelSelect');
    },

    click: function(pointer) {

	    // enable pick up of answers, by doing a hit test on the touch/mouse pointer with the answers
	    var bodies = game.physics.p2.hitTest(pointer.position, this.questionManager.getAnswerBodies());

	    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
	    var physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];


	    if (bodies.length)
	    {
	        var clickedBody = bodies[0];

	        var localPointInBody = [0, 0];
	        // this function takes physicsPos and coverts it to the body's local coordinate system
	        clickedBody.toLocalFrame(localPointInBody, physicsPos);

	        // use a revoluteContraint to attach mouseBody to the clicked body
	        this.mouseConstraint = this.game.physics.p2.createRevoluteConstraint(this.mouseBody, [0, 0], clickedBody, [game.physics.p2.mpxi(localPointInBody[0]), game.physics.p2.mpxi(localPointInBody[1]) ]);
	    }

	},

    release: function() {

	    // release the answers from any touch/mouse holed by removing constraint from object's body
	    game.physics.p2.removeConstraint(this.mouseConstraint);

	},

    move: function(pointer) {

	    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
	    this.mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
	    this.mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);

	}

}