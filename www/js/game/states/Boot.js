
var angryMaths = function() {};

angryMaths.Boot = function() {};

angryMaths.Boot.prototype = {
  preload: function() {
    this.load.image('loadingtext', 'assets/images/loading_text.png');
    this.load.image('preloadbar', 'assets/images/loading_bar.png');
    this.load.image('background', 'assets/images/background1334_1000.png');

  },
  create: function() {

    game.stage.backgroundColor = '#000000';

    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    this.input.maxPointers = 1;

    //  scale the game, no lower than iphone 4 (320,480) and no higher than ipad pro (2048, 2732)
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setMinMax(480, 320, 2732, 2048);
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    this.scale.refresh();

    //  Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 1000;
    game.physics.p2.setImpactEvents(true);

    //  By this point the preloader assets have loaded to the cache, we've set the game settings
    //  So now let's start the real preloader going
    this.state.start('Preloader');
  }
};