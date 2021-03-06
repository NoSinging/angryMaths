angryMaths.LevelSelect = function() {
	// how many pages are needed to show all levels?
	var pages;
	// group where to place all level thumbnails
	var levelThumbsGroup;
	// current page
	var currentPage;
	// arrows to navigate through level pages
	var leftArrow;
	var rightArrow;

	var info;
  };

angryMaths.LevelSelect.prototype = {
  	create: function(){
  		// background
    	game.add.sprite(0, 0, 'background');

  		// display stars
  		this.starCountIcon = game.add.image(game.width-300,60, 'star');
  		this.starCountText = game.add.bitmapText(64, 10,'raffic', game.levels.getTotalStars() + '/' + game.levels.getMaxStars(), 64);
		this.starCountIcon.addChild(this.starCountText);

		// add return to main menu
    	game.add.button(20, 40,  "back", this.home, this);

		info = game.add.text(16, 30, ' ');
		info.font = "Courier";
		info.fontSize = 24;
		info.fill = "#ffffff";
		info.lineSpacing = 4;
		info.setShadow(2, 2);

		levelScaleFactor = .75;

  		// how many pages are needed to show all levels?
		// CAUTION!! EACH PAGE SHOULD HAVE THE SAME AMOUNT OF LEVELS, THAT IS
		// THE NUMBER OF LEVELS *MUST* BE DIVISIBLE BY THUMBCOLS*THUMBROWS
  		pages = game.levels.starsArray.length/(game.levels.thumbRows*game.levels.thumbCols);

		// creation of the thumbails group
		levelThumbsGroup = game.add.group();
		// determining level thumbnails width and height for each page
		var levelLength = levelScaleFactor*game.levels.thumbWidth*game.levels.thumbCols+game.levels.thumbSpacing*(game.levels.thumbCols-1);
		var levelHeight = levelScaleFactor*game.levels.thumbWidth*game.levels.thumbRows+game.levels.thumbSpacing*(game.levels.thumbRows-1);

  		if (pages > 1) {
	  		// current page according to last played level, if any
			currentPage = Math.floor(game.levels.level/(game.levels.thumbRows*game.levels.thumbCols));
			if(currentPage>pages-1){
				currentPage = pages-1;
			}

			// left arrow button, to turn one page left
			leftArrow = game.add.button((game.width-levelLength)/2,420,"level_arrows",this.arrowClicked,this);
			leftArrow.anchor.setTo(0.5);
			leftArrow.frame = 0;
			// can we turn one page left?
			if(currentPage==0){
				leftArrow.alpha = 0.3;
			}
			// right arrow button, to turn one page right
			rightArrow = game.add.button((game.width+levelLength)/2,420,"level_arrows",this.arrowClicked,this);
			rightArrow.anchor.setTo(0.5);
			rightArrow.frame = 1;
			// can we turn one page right?
			if(currentPage==pages-1){
				rightArrow.alpha = 0.3;
			}
		} else 		{
			currentPage = 0;
		}
		// looping through each page
		for(var l = 0; l < pages; l++){
			// horizontal offset to have level thumbnails horizontally centered in the page
			var offsetX = (game.width-levelLength)/2+game.width*l;
			// I am not interested in having level thumbnails vertically centered in the page, but
			// if you are, simple replace my "20" with
			// (game.height-levelHeight)/2
			var offsetY = 60 +  (game.height-levelHeight)/2;
			// looping through each level thumbnails
		     for(var i = 0; i < game.levels.thumbRows; i ++){
		     	for(var j = 0; j < game.levels.thumbCols; j ++){
		     		// which level does the thumbnail refer?
					var levelNumber = i*game.levels.thumbCols+j+l*(game.levels.thumbRows*game.levels.thumbCols);
					// adding the thumbnail, as a button which will call thumbClicked function if clicked
					var levelThumb = game.add.button(offsetX+j*(levelScaleFactor*game.levels.thumbWidth+game.levels.thumbSpacing), offsetY+i*(levelScaleFactor*game.levels.thumbHeight+game.levels.thumbSpacing), "levels", this.thumbClicked, this);
					// shwoing proper frame
					levelThumb.frame=game.levels.starsArray[levelNumber];
					// custom attribute
					levelThumb.levelNumber = levelNumber+1;
					// adding the level thumb to the group
					levelThumbsGroup.add(levelThumb);
					// scale level Thumb DH
					levelThumb.scale.setTo(levelScaleFactor, levelScaleFactor);

					// Add a label in each level selection
				    var questionJSON = game.cache.getJSON('questionsLevel' + (levelNumber+1));
				    var levelLabel = questionJSON.label;
					//var levelThumbText = game.add.bitmapText(32, 40,'raffic', levelLabel, 64);
					var levelThumbText = game.add.bitmapText(52, 44,'raffic', levelLabel, 64);

					// if it's a timed level, show the timer icon
					// TODO: ugly code!
					// TODO: make small timer image
					var iconAlpha = (game.levels.starsArray[levelNumber] == 4) ? 0.5:1.0;
					if (questionJSON.mode == game.levels.TIMED) {
			    		var playModeIcon = game.add.sprite(80, 20, 'timer');
				    	playModeIcon.scale.setTo(0.6,0.6);
						playModeIcon.alpha = iconAlpha;
				    	levelThumb.addChild(playModeIcon);
			    	} else if (questionJSON.mode == game.levels.REVERSE) {
			    		var playModeIcon = game.add.sprite(90, 20, 'radiationSmall');
				    	playModeIcon.scale.setTo(0.7,0.7);
						playModeIcon.alpha = iconAlpha;
				    	levelThumb.addChild(playModeIcon);
			    	}


					levelThumb.addChild(levelThumbText);
					levelThumbText.alpha = iconAlpha;
				}
			}
		}
		// scrolling thumbnails group according to level position
		levelThumbsGroup.x = currentPage * game.width * -1
	},
	update:function() {
	},
	arrowClicked:function(button){
		// touching right arrow and still not reached last page
		if(button.frame==1 && currentPage<pages-1){
			leftArrow.alpha = 1;
			currentPage++;
			// fade out the button if we reached last page
			if(currentPage == pages-1){
				button.alpha = 0.3;
			}
			// scrolling level pages
			var buttonsTween = game.add.tween(levelThumbsGroup);
			buttonsTween.to({
				x: currentPage * game.width * -1
			}, 500, Phaser.Easing.Cubic.None);
			buttonsTween.start();
		}
		// touching left arrow and still not reached first page
		if(button.frame==0 && currentPage>0){
			rightArrow.alpha = 1;
			currentPage--;
			// fade out the button if we reached first page
			if(currentPage == 0){
				button.alpha = 0.3;
			}
			// scrolling level pages
			var buttonsTween = game.add.tween(levelThumbsGroup);
			buttonsTween.to({
				x: currentPage * game.width * -1
			}, 400, Phaser.Easing.Cubic.None);
			buttonsTween.start();
		}
	},
	thumbClicked:function(button){
		// the level is playable, then play the level!!
		if(button.frame < 4){
			game.levels.level = button.levelNumber;
			game.state.start("LevelStart");
		}
		// else, let's shake the locked levels
		else{
			var buttonTween = game.add.tween(button)
			buttonTween.to({
				alpha: 0.5
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 1
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 0.5
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.to({
				alpha: 1
			}, 20, Phaser.Easing.Cubic.None);
			buttonTween.start();
		}
	},
	home:function() {
		game.state.start("MainMenu");
	}
};