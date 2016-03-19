angryMaths.playLevel = function() {
  };

angryMaths.playLevel.prototype = {
  	create: function(){
		// showing level title
		var style = {
			font: "32px Arial",
			fill: "#000000"
		};
		var levelTitle = game.add.text(0,0,"PLAYING LEVEL "+game.global.level,style);
		levelTitle.align = "center";
          levelTitle.x = (game.width - levelTitle.width) / 2;

         // dummy game set up
         game.add.button(game.width/2, 200, "logo", this.levelFinished, this);

	},
	levelFinished: function(stars){
		stars = 2;
		// did we improved our stars in current level?
		if(game.global.starsArray[game.global.level-1]<stars){
			game.global.starsArray[game.global.level-1] = stars;
		}
		// if we completed a level and next level is locked - and exists - then unlock it
		if(stars>0 && game.global.starsArray[game.global.level]==4 && game.global.level<game.global.starsArray.length){
			game.global.starsArray[game.global.level] = 0;
		}
		// back to level selection
		game.state.start("LevelSelect");
	}
}