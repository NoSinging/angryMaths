
var Question = function(game, x, y) {
  this.FONT_SIZE = 76;
  Phaser.BitmapText.call(this, game, x, y,'raffic', 'some text', this.FONT_SIZE);
  game.add.existing(this);

};

Question.prototype = Object.create(Phaser.BitmapText.prototype);
Question.prototype.constructor = Question;

Question.prototype.update = function() {
  // write your prefab's specific update code here
};

Question.prototype.setText = function(text) {
  // update the question text
   this.text = text;
};

Question.prototype.setQuestionMark = function(questionMark) {
  // TODO - this methods needs tidy up
  // offset on Y to make it line up
  questionMark.body.y = this.y+40;

  // OK major cludge here in setting the position of the physcis question mark body  relative to the question
  // ? in question text will be replaced by questionMark image (currently an empty box)
  // we have 2 simple cases, either the ? is the first or the last character.  There is only 1 ?
  // let's set the x-offset for each case, pushing it either slightly to the left
  // test for 1st or last character
  pos = this.text.indexOf('?') + 1; //adding 1 so it can be compared to length
  length = this.text.length;

  xOffset = 0;
  questionMarkReplaceText = '';

  if (pos == length) {
    // ? is last character, place at end
    xOffset = this.width;
    questionMarkReplaceText = '';
  } else if (pos == 1) {
    // ? is first character, place at start
    xOffset = 0;
    questionMarkReplaceText = '  '; // 2spaces
  } else {
    // ? is in the middle
    // offset to the position of the ?
    // replace with 2 spaces each side of ?
    questionMarkReplaceText = '    '; // 4spaces
    textToQuestionMark = this.text.slice(0,pos);
    bitMapTextToQuestionMark = game.add.bitmapText(100,100,'raffic',textToQuestionMark, this.FONT_SIZE);
    bitMapTextToQuestionMark.alpha = 0; // hide it
    xOffset = bitMapTextToQuestionMark.width;
  }

  questionMark.body.x = this.x+xOffset;

  // replace the question text ? with appropriate text.
  this.text = this.text.replace('?',questionMarkReplaceText);

};
