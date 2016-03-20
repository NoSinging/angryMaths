angryMaths.playLevel = function() {
  };

angryMaths.playLevel.prototype = {
  	create: function(){
		// showing level title
		var style = {
			font: "32px Arial",
			fill: "#ffffff"
		};
		var levelTitle = game.add.text(0,0,"PLAYING LEVEL "+game.levels.level,style);
		levelTitle.align = "center";
        levelTitle.x = (game.width - levelTitle.width) / 2;

         // dummy game set up
         //game.add.button(game.width/2, 200, "logo", this.levelFinished, this);

         // create a question
	    this.question = new Question(this.game, 400, this.game.height/2);
	    // and add it to the game
	    this.game.add.existing(this.question);
	    // add some text
	    this.question.setText('2 + 2 = ');

	},
	update: function() {

	},
	shutdown: function() {

	},
	levelFinished: function(){
		stars = 2;
		game.levels.levelFinished(stars);
		// back to level selection
		game.state.start("LevelSelect");
	}
}