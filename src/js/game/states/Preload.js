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
    this.load.image('wrong', 'assets/images/icon_bomb.png');
    this.load.image('correct', 'assets/images/icon_emergency_kit.png');
    this.load.image('star', 'assets/images/star64.png');
    this.load.image('starGrey', 'assets/images/star64grey.png');
    this.load.image('circleGrey', 'assets/images/circle-16-grey.png');
    this.load.image('circleGreen', 'assets/images/circle-16-green.png');
    this.load.image('circleRed', 'assets/images/circle-16-red.png');
    this.load.image('replay', 'assets/images/btn_cicle_retry_right_red.png');
    this.load.image('next', 'assets/images/btn_cicle_right_red.png');
    this.load.image('menu', 'assets/images/btn_cicle_menu_red.png');
    this.load.image('menuGreen', 'assets/images/btn_cicle_menu_green.png');
    this.load.image('play', 'assets/images/btn_play_n.png');
    this.load.image('settings', 'assets/images/btn_cicle_setting_green.png');
    this.load.image('back', 'assets/images/btn_back.png');
    this.load.image('timer', 'assets/images/icon_time.png');
    this.load.image('progressOuter', 'assets/images/progress_outer.png');
    this.load.image('progressBarGreen', 'assets/images/progress_bar_green.png');
    this.load.image('frame', 'assets/images/frame.png');


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
    this.load.json('questionsLevel17', 'config/questionsLevel17.json');
    this.load.json('questionsLevel18', 'config/questionsLevel18.json');
    this.load.json('questionsLevel19', 'config/questionsLevel19.json');
    this.load.json('questionsLevel20', 'config/questionsLevel20.json');
    this.load.json('questionsLevel21', 'config/questionsLevel21.json');
    this.load.json('questionsLevel22', 'config/questionsLevel22.json');
    this.load.json('questionsLevel23', 'config/questionsLevel23.json');
    this.load.json('questionsLevel24', 'config/questionsLevel24.json');
    this.load.json('questionsLevel25', 'config/questionsLevel25.json');
    this.load.json('questionsLevel26', 'config/questionsLevel26.json');
    this.load.json('questionsLevel27', 'config/questionsLevel27.json');
    this.load.json('questionsLevel28', 'config/questionsLevel28.json');

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