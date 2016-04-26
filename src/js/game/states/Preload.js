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
    //this.load.audio('death', 'assets/audio/death.wav');

    this.load.bitmapFont('raffic', 'assets/fonts/raffic/font.png', 'assets/fonts/raffic/font.xml');


    // preloading level menu assets
    this.load.spritesheet("levels", "assets/images/levels.png", game.levels.thumbWidth, game.levels.thumbHeight);
    this.load.spritesheet("level_arrows", "assets/images/level_arrows.png", 48, 48);

    // load other images
    this.load.image('blank', 'assets/images/blank-64.png');
    this.load.image('square', 'assets/images/square-rounded-48.png');
    this.load.image('wrong', 'assets/images/red_cross.png');
    this.load.image('correct', 'assets/images/check_mark.png');
    this.load.image('star', 'assets/images/star64.png');
    this.load.image('starGrey', 'assets/images/star64grey.png');
    this.load.image('circleGrey', 'assets/images/circle-16-grey.png');
    this.load.image('circleGreen', 'assets/images/circle-16-green.png');
    this.load.image('circleRed', 'assets/images/circle-16-red.png');
    this.load.image('replay', 'assets/images/refresh64.png');
    this.load.image('next', 'assets/images/arrow64.png');
    this.load.image('menu', 'assets/images/menu64.png');
    this.load.image('play', 'assets/images/play64.png');
    this.load.image('settings', 'assets/images/settings-64.png');

    this.load.setPreloadSprite(this.preloadBar);

    this.load.onLoadComplete.add(this.onLoadComplete, this);

    // load the questions
    this.load.json('questionsLevel1', 'config/questionsLevel1.json');
    this.load.json('questionsLevel2', 'config/questionsLevel2.json');
    this.load.json('questionsLevel3', 'config/questionsLevel3.json');
    this.load.json('questionsLevel4', 'config/questionsLevel4.json');
    this.load.json('questionsLevel5', 'config/questionsLevel5.json');
    this.load.json('questionsLevel6', 'config/questionsLevel6.json');
    this.load.json('questionsLevel7', 'config/questionsLevel7.json');
    this.load.json('questionsLevel8', 'config/questionsLevel8.json');
    this.load.json('questionsLevel9', 'config/questionsLevel9.json');
    this.load.json('questionsLevel10', 'config/questionsLevel10.json');
    this.load.json('questionsLevel11', 'config/questionsLevel11.json');
    this.load.json('questionsLevel12', 'config/questionsLevel12.json');
    this.load.json('questionsLevel13', 'config/questionsLevel13.json');
    this.load.json('questionsLevel14', 'config/questionsLevel14.json');
    this.load.json('questionsLevel15', 'config/questionsLevel15.json');
    this.load.json('questionsLevel16', 'config/questionsLevel16.json');

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