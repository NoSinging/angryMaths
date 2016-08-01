"use strict";
class levels {
    constructor() {
    this.thumbRows = 7;
    // number of thumbnail cololumns
    this.thumbCols = 4;
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
    this.INITIAL_GAME_STARS = [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
    this.starsArray = this.INITIAL_GAME_STARS;
    this.retrieve();

    // level currently playing
    this.level = 0;
    }
    levelFinished(stars){
        // did we improved our stars in current level?
        if(this.starsArray[this.level-1]<stars){
            this.starsArray[this.level-1] = stars;
        }
        // if we completed a level and next level is locked - and exists - then unlock it
        if(stars>0 && this.starsArray[this.level]==4 && this.level<this.starsArray.length){
            this.starsArray[this.level] = 0;
        }
        this.save();
    }
    isNextLevelUnlocked(){
        // test next level exists and it's status
        return (this.level<this.starsArray.length && this.starsArray[this.level] !=4);
    }
    clearProgress(){
        // reset to initial star array
        this.starsArray = this.INITIAL_GAME_STARS;
        this.save();
    }
    save(){
        if(typeof(Storage) !== "undefined") {
            // Code for localStorage.
            localStorage.levels = JSON.stringify(this.starsArray);
            return true
        } else {
            // Sorry! No Web Storage support..
            console.log('NO storage!');
            return false
        }
    }
    retrieve(){
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
    }
    getMaxStars(){
        return this.starsArray.length * 3;
    }
    getTotalStars(){
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
    }
};