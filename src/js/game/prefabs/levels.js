"use strict";
class levels {
    constructor() {
    this.thumbRows = 5;
    // number of thumbnail cololumns
    this.thumbCols = 4;
    // width of a thumbnail, in pixels
    this.thumbWidth = 64;
    // height of a thumbnail, in pixels
    this.thumbHeight = 64;
    // space among thumbnails, in pixels
    this.thumbSpacing = 8;
    // array with finished levels and stars collected.
    // 0 = playable yet unfinished level
    // 1, 2, 3 = level finished with 1, 2, 3 stars
    // 4 = locked
    this.starsArray = [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
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
    }
};