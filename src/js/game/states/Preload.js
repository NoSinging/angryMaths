angryMaths.Preload = function() {
  this.ready = false;
};

angryMaths.Preload.prototype = {
  preload: function() {

    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.audio('gameMusic', ['assets/audio/Pamgaea.mp3', 'assets/audio/Pamgaea.ogg']);
    this.load.audio('coin', 'assets/audio/coin.wav');
    this.load.audio('death', 'assets/audio/death.wav');

    this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia/minecraftia.png', 'assets/fonts/minecraftia/minecraftia.xml');


    // preloading level menu assets
    this.load.spritesheet("levels", "assets/images/levels.png", game.levels.thumbWidth, game.levels.thumbHeight);
    this.load.spritesheet("level_arrows", "assets/images/level_arrows.png", 48, 48);

    // load other images
    this.load.image('square', 'assets/images/square-rounded-48.png');
    this.load.image('wrong', 'assets/images/red_cross.png');
    this.load.image('correct', 'assets/images/check_mark.png');

    this.load.setPreloadSprite(this.preloadBar);

    this.load.onLoadComplete.add(this.onLoadComplete, this);

    // load the questions
    this.load.json('questionsLevel1', 'config/questionsLevel1.json');
    this.load.json('questionsLevel2', 'config/questionsLevel2.json');
    this.load.json('questionsLevel3', 'config/questionsLevel3.json');
    this.load.json('questionsLevel4', 'config/questionsLevel4.json');

    // load this app version config
    game.load.json('version', 'config/version.json');
  },
  create: function() {
    this.preloadBar.cropEnabled = false;
  },
  update: function() {
    if(this.cache.isSoundDecoded('gameMusic') && this.ready === true) {
      this.state.start('MainMenu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};