function levels() {

    // Identifiers for each game mode
    this.PRACTICE = 'practice';
    this.TIMED = 'timed';
    this.REVERSE = 'reverse';


    this.thumbRows = 4;
    // number of thumbnail cololumns
    this.thumbCols = 7;
    // width of a thumbnail, in pixels
    this.thumbWidth = 180; //64;
    // height of a thumbnail, in pixels
    this.thumbHeight = 160; //64;
    // space among thumbnails, in pixels
    this.thumbSpacing = 8;
    // array with finished levels and stars collected.
    // 0 = playable yet unfinished level
    // 1, 2, 3 = level finished with 1, 2, 3 stars
    // 4 = locked
    this.INITIAL_GAME_STARS =     [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
    //this.INITIAL_GAME_STARS =       [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    this.starsArray = this.INITIAL_GAME_STARS;
    this.retrieve();

    // level currently playing
    this.level = 0;
}

levels.prototype.levelFinished = function(stars) {
        // did we improved our stars in current level?
        if(this.starsArray[this.level-1]<stars){
            this.starsArray[this.level-1] = stars;
        }
        // if we completed a level and next level is locked - and exists - then unlock it
        if(stars>0 && this.starsArray[this.level]==4 && this.level<this.starsArray.length){
            this.starsArray[this.level] = 0;
        }
        this.save();
};

levels.prototype.unlockNextLevel = function(){
        // if next level  exists and is locked - and- then unlock it
        if(this.level<this.starsArray.length && this.starsArray[this.level]==4){
            this.starsArray[this.level] = 0;
        }
        this.save();
};

levels.prototype.isNextLevelUnlocked = function(){
        // test next level exists and it's status
        return (this.level<this.starsArray.length && this.starsArray[this.level] !=4);
};

levels.prototype.isNextLevelLocked = function(){
        // test next level exists and it's status
        return (this.level<this.starsArray.length && this.starsArray[this.level] ==4);
};

levels.prototype.clearProgress = function(){
        // reset to initial star array
        this.starsArray = this.INITIAL_GAME_STARS;
        this.save();
};

levels.prototype.save = function(){
        if(typeof(Storage) !== "undefined") {
            // Code for localStorage.
            localStorage.levels = JSON.stringify(this.starsArray);
            return true
        } else {
            // Sorry! No Web Storage support..
            console.log('NO storage!');
            return false
        }
};

levels.prototype.retrieve = function(){
        if(typeof(Storage) !== "undefined") {
            // Code for localStorage.
            var levels =  localStorage.levels;
            if (typeof(levels) !== "undefined" && levels !== null && levels.length >= 0) {
                // store levels already exist
                this.starsArray = JSON.parse(levels);
                return true;
            } else {
                // no levels stored yet
                return false;
            }
        } else {
            // Sorry! No Web Storage support..
            console.log('NO storage!');
            return false;
        }
        return false;
};

levels.prototype.getMaxStars = function(){
        return this.starsArray.length * 3;
};

levels.prototype.getTotalStars = function(){
        var totalStars = 0;
        var levelStars = 0;
        var i = 0;
        var len = this.starsArray.length;
        for (; i < len; i++) {
            levelStars = this.starsArray[i];
            if (levelStars < 4 && levelStars > 0) {
                totalStars += levelStars;
            }
        }
        return totalStars;
};
