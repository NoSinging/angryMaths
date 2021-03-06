angryMaths.PlayLevel = function() {
		var mouseBody;
		var touchConstraint;
		var questionManager;
		var scoreBar;
        var answer;
        var isAnswerTouching;
        var FLICK_DISTANCE;
  };

angryMaths.PlayLevel.prototype = {
  	create: function(){
        this.FLICK_DISTANCE = 150;

        // Add in the background
        game.add.sprite(0, 0, 'background');

        // Add in the grass background at the bottom of the lowest tile
        // 23 tiles x32pixels = 736
        game.add.sprite(0, 736, 'grassBackground');

        questionBackground = game.add.sprite(360, 0, 'questionBackground');

	    // create the score tray
	    this.scoreBar = new ScoreBar(game, 20,80);

        // create the lives
        this.lives = new Lives(game, 20,20);

        //  Create collision group for the answers &  question
        this.collisionGroup = game.physics.p2.createCollisionGroup();

	    //  objects with their own collision groups to  collide with the world bounds
	    //  what this does is adjust the bounds to use its own collision group.
	    game.physics.p2.updateBoundsCollisionGroup();

	    // create physics body for mouse which we will use for dragging clicked bodies
	    this.mouseBody = new p2.Body();
	    game.physics.p2.world.addBody(this.mouseBody);

	    // attach pointer events, max 1 point to save confusion on touch devices
	    game.input.maxPointers = 1;
	    game.input.onDown.add(this.click, this);
	    game.input.onUp.add(this.release, this);
	    game.input.addMoveCallback(this.move, this);

		this.stars = 0;

        this.touchPosition = new Phaser.Point(0,0);

        // navigation
        menuButton = game.add.button(game.width - 120, 40,  "menuGreenSmall", this.menu, this);

        // tiles
        //Add the tilemap and tileset image. The first parameter in addTilesetImage
        //is the name you gave the tilesheet when importing it into Tiled, the second
        //is the key to the asset in Phaser
        tileMapLevel = 'tilemap' + game.levels.level;
        this.map = this.game.add.tilemap(tileMapLevel);
        this.map.addTilesetImage('box','box');
        this.map.addTilesetImage('target','boxCoin');
        this.map.addTilesetImage('stone','stone');
        this.map.addTilesetImage('grass','grassMid');
        this.map.addTilesetImage('barrel','barrel');

        // create ground
        this.ground = new Ground(this.map);
        this.ground.setCollisionGroup(this.collisionGroup);

        // create foreground
        this.foreground = new Foreground(this.map);
        this.foreground.setCollisionGroup(this.collisionGroup);

        // create target
        this.target = new Target(this.map);
        this.target.setCollisionGroup(this.collisionGroup);

        // create boxes
        this.boxManager = new BoxManager(this.map);
        this.boxManager.setCollisionGroup(this.collisionGroup);

        // create hazards
        this.hazardManager = new HazardManager(this.map);
        this.hazardManager.setCollisionGroup(this.collisionGroup);

        // create spawn points
        this.spawns = new Spawns(this.map);

        // create a single question manager
        this.questionManager = new QuestionManager(game.levels.level, this.scoreBar, this.lives, this.spawns);
        this.questionManager.initialiseCollisionGroup(this.collisionGroup);
        this.questionManager.intro();

        // let's make challenge level's skipable
        // if this level is a challenge level (i.e. we've tried it)
        // and next level is locked -  and exists - then unlock it
        if (this.questionManager.isLevelChallenge()     &&
            game.levels.isNextLevelLocked()) {
                game.levels.unlockNextLevel();
        }

        // if game mode is 'timed' then start
        // create the timer
        if (this.questionManager.isLevelTimed()) {
            this.levelTimer = new LevelTimer(game, 950,20);
            this.levelTimer.start(this.questionManager.questionJSON.time*1000);
        } else {
            this.levelTimer = undefined;
        }

	},
	update: function() {

        // test for a level finished
        if (this.questionManager.isLevelFinished()) {
                this.levelFinished();
                return;
        }

        // test for a question completed
        if (this.questionManager.isQuestionComplete()){
            // release any touch holds on answers
            this.release();

            // start the next question
            this.questionManager.currentQuestion++;
            this.questionManager.intro();

        }

        // test for timeout
        if (typeof this.levelTimer != "undefined" && this.levelTimer.isTimeOut) {
                this.levelFinished();
                return;
        }

        // test for no lives left
        if (this.lives.livesCount == 0) {
                this.levelFinished();
                return;
        }

	},
	shutdown: function() {

	},
	levelFinished: function(){
		this.calculateStars();
		game.levels.levelFinished(this.stars);
		// back to level selection

        game.level += 1;
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
        // save progress
        this.calculateStars();
        game.levels.levelFinished(this.stars);

        // back to level selection
        this.game.state.start('LevelSelect');
    },

    click: function(pointer) {

        // record the point of the click, we'll use it later to implement the flick
        this.touchPosition.x = pointer.position.x;
        this.touchPosition.y = pointer.position.y;

	    // enable pick up of answers, by doing a hit test on the touch/mouse pointer with the answers
	    var bodies = game.physics.p2.hitTest(pointer.position, this.questionManager.getAnswerBodies());

	    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
	    var physicsPos = [game.physics.p2.pxmi(pointer.position.x), game.physics.p2.pxmi(pointer.position.y)];


	    if (bodies.length && bodies[0].parent != "undefined" &&
            bodies[0].parent.sprite != "undefined" && bodies[0].parent.sprite.key =="answerFrame")
	    {
	        var clickedBody = bodies[0];

	        var localPointInBody = [0, 0];
	        // this function takes physicsPos and coverts it to the body's local coordinate system
	        clickedBody.toLocalFrame(localPointInBody, physicsPos);

            // only bodies that are stationary can be picked up
            //
            if (this.distance([0,0],clickedBody.velocity)<1 && bodies[0].parent.sprite.status == 'READY') {
                // use a revoluteContraint to attach mouseBody to the clicked body
                // set max force to a large number,10,000, but less than infinite, so that answers can't be dragged through walls
                this.touchConstraint = this.game.physics.p2.createRevoluteConstraint(
                    this.mouseBody,
                    [0, 0],
                    clickedBody,
                    [game.physics.p2.mpxi(localPointInBody[0]), game.physics.p2.mpxi(localPointInBody[1]) ],
                    10000);
                bodies[0].parent.sprite.setTouchConstraint(this.touchConstraint);
            }
	    }

	},

    release: function() {

	    // release the answers from any touch/mouse holed by removing constraint from object's body
	    game.physics.p2.removeConstraint(this.touchConstraint);

	},

    move: function(pointer) {

        if (this.touchPosition.distance(pointer.position, this.touchPosition) > this.FLICK_DISTANCE) {
            this.release();
        }

	    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
	    this.mouseBody.position[0] = game.physics.p2.pxmi(pointer.position.x);
	    this.mouseBody.position[1] = game.physics.p2.pxmi(pointer.position.y);

	},

    distance: function(a,b) {

        return Math.sqrt(Math.pow((a[0]-b[0]),2) + Math.pow((a[1]-b[1]),2));

    }

}