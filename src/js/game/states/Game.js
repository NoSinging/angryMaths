angryMaths.Game = function() {
  };

angryMaths.Game.prototype = {
  create: function() {

    this.gameMusic = this.game.add.audio('gameMusic');
    this.gameMusic.play('', 0, true);
  },
  update: function() {

  },
  shutdown: function() {

  }

};