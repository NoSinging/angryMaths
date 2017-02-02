angryMaths.Preload = function() {
  this.ready = false;
};

angryMaths.Preload.prototype = {
  preload: function() {

    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingtext');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.bitmapFont('raffic', 'assets/fonts/raffic/font.png', 'assets/fonts/raffic/font.xml');


    // preloading level menu assets
    this.load.spritesheet("levels", "assets/images/levels.png", game.levels.thumbWidth, game.levels.thumbHeight);
    this.load.spritesheet("level_arrows", "assets/images/level_arrows.png", 48, 48);

    // load other images
    this.load.image('helmet2', 'assets/images/mathsmission2helmet.png');
    this.load.image('blank', 'assets/images/blank-64.png');
    this.load.image('wrong', 'assets/images/icon_bomb.png');
    this.load.image('correct', 'assets/images/icon_emergency_kit.png');
    this.load.image('star', 'assets/images/star64.png');
    this.load.image('starGrey', 'assets/images/star64grey.png');
    this.load.image('replay', 'assets/images/btn_cicle_retry_right_red.png');
    this.load.image('next', 'assets/images/btn_cicle_right_red.png');
    this.load.image('menu', 'assets/images/btn_cicle_menu_red.png');
    this.load.image('menuGreen', 'assets/images/btn_cicle_menu_green.png');
    this.load.image('play', 'assets/images/btn_play_n.png');
    this.load.image('settings', 'assets/images/btn_cicle_setting_green.png');
    this.load.image('back', 'assets/images/btn_back.png');
    this.load.image('timer', 'assets/images/icon_time.png');
    this.load.image('heartDimmed', 'assets/images/icon_heart_dimmed.png');
    this.load.image('progressOuter', 'assets/images/progress_outer.png');
    this.load.image('progressBarGreen', 'assets/images/progress_bar_green.png');
    this.load.image('frame', 'assets/images/answerFrame.png');

    //this.load.image('sky', 'assets/images/sky1334_834.png');
    this.load.image('questionBackground', 'assets/images/bg_setting.png');
    this.load.image('skull', 'assets/images/gage_icon_skull.png');
    this.load.image('charge', 'assets/images/gage_icon_charge.png');
    this.load.image('radiationSmall', 'assets/images/radiationBorder64.png');

    this.load.spritesheet("woodenBox", "assets/images/woodBoxSheet32.png", 32, 32,3,2,2);

    // tiles
    for(var i=1; i<=9; i++){
        tileMapKey = 'tilemap' + i;
        tileMapFile = 'config/levelMaps/angryMathMap' + i + '.json'
        this.game.load.tilemap(tileMapKey, tileMapFile, null, Phaser.Tilemap.TILED_JSON);
    }

    this.game.load.image('box', 'assets/images/box32_32.png');
    this.game.load.image('boxCoin', 'assets/images/boxCoin32_32.png');
    this.game.load.image('stone', 'assets/images/stone32_32.png');
    this.game.load.image('grassMid', 'assets/images/grassMid32_32.png');
    this.game.load.image('barrel', 'assets/images/barrelSmall.png');


    // answers frame
    // TODO rationalise these with above, e.g. remove answerFrame?
    game.load.image('answerFrame', 'assets/images/answerFrameSmall.png');

    // Duplicate Tick and cross with bomb and healthkit
    game.load.image('bomb', 'assets/images/icon_bomb.png');
    game.load.image('healthKit', 'assets/images/icon_emergency_kit.png');

    game.load.spritesheet('explosion', 'assets/images/part_explosion.png',1000,1000);
    game.load.spritesheet('smoke', 'assets/images/smokeSpriteSheet.png',128,128);

    // sprites , a margin of 2 pixels
    game.load.spritesheet('hearts', 'assets/images/hearts.png',72,68,2,0,2);

    this.load.setPreloadSprite(this.preloadBar);

    this.load.onLoadComplete.add(this.onLoadComplete, this);

    // load the questions
    for(var i=1; i<=28; i++){
        levelKey = 'questionsLevel' + i;
        levelFile = 'config/questionsLevel' + i + '.json'
        this.load.json(levelKey, levelFile);
    }

    // load this app version config
    game.load.json('version', 'config/version.json');

  },
  create: function() {
    this.preloadBar.cropEnabled = false;
  },
  update: function() {
    // if(this.cache.isSoundDecoded('gameMusic') && this.ready === true) {
    //   this.state.start('MainMenu');
    // }
    if(this.ready) {
      this.state.start('MainMenu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};