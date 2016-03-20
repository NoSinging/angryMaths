angryMaths.playLevel = function() {
  };

angryMaths.playLevel.prototype = {
  	create: function(){
		// showing level title
		var style = {
			font: "32px Arial",
			fill: "#000000"
		};
		var levelTitle = game.add.text(0,0,"PLAYING LEVEL "+game.levels.level,style);
		levelTitle.align = "center";
          levelTitle.x = (game.width - levelTitle.width) / 2;

         // dummy game set up
         game.add.button(game.width/2, 200, "logo", this.levelFinished, this);

	},
	levelFinished: function(){
		stars = 2;
		game.levels.levelFinished(stars);
		// back to level selection
		game.state.start("LevelSelect");
	}
}