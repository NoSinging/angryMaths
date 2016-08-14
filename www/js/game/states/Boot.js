
var angryMaths = function() {};

angryMaths.Boot = function() {};

angryMaths.Boot.prototype = {
  preload: function() {
    this.load.image('loadingtext', 'assets/images/loading_text.png');
    this.load.image('preloadbar', 'assets/images/loading_bar.png');
    this.load.image('background', 'assets/images/background.png');
  },
  create: function() {
    this.game.stage.backgroundColor = '#ffffff';

    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    this.input.maxPointers = 1;

    if (this.game.device.desktop) {
      //  If you have any desktop specific settings, they can go in here
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.setMinMax(480, 260, 2048, 2732);
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      this.scale.refresh();
    } else {
      //  Same goes for mobile settings.
      //  scale the game, no lower than low res and no higher than ipad pro (2048, 2732)
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.setMinMax(320, 568, 2048, 2732);
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      this.scale.refresh();
    }

    //  By this point the preloader assets have loaded to the cache, we've set the game settings
    //  So now let's start the real preloader going
    this.state.start('Preloader');
  }
};