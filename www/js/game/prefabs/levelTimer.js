
var LevelTimer = function(game, x, y, key, frame) {
    // The ScoreBar is a sprite, image is progress bar
    Phaser.Sprite.call(this, game, x, y, 'timer');
    game.add.existing(this);


    // add child text, at index zero, later we'll add cargo at index 1
    this.FONT_SIZE = 76;
    this.levelTimeText = game.add.bitmapText(110, 30,'raffic', '', this.FONT_SIZE);
    this.addChild(this.levelTimeText,0);

    // set the time
    this.isTimeOut = false;
    this.levelTime = 0;

    //  Create our Timer
    this.timer = game.time.create(false);

};

LevelTimer.prototype = Object.create(Phaser.Sprite.prototype);
LevelTimer.prototype.constructor = LevelTimer;

LevelTimer.prototype.update = function() {
  // write prefab's specific update code here

    this.levelTimeText.text = Math.ceil(this.timer.duration/1000);
};


LevelTimer.prototype.start = function(time) {

    //  Set a TimerEvent to occur after configured seconds
    this.timer.add(time, this.timeOut, this);
    this.levelTime = time;

    //  Start the timer
    this.isTimeOut = false;
    this.timer.start();
};

LevelTimer.prototype.timeOut = function() {
    //  Start the timer
    this.isTimeOut = true;
};

