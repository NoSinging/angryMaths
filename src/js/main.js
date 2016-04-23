// *window.devicePixelRatio
// let's set a target device iphone 5
// aspect 9:16
// 640 x 1136 twice 320 x 568
// (todo: change to iphone 6 as target: 750 x 1334)
var targetDeviceWidth = 640;
var targetDeviceHeight = 1136;
var game = new Phaser.Game(targetDeviceWidth, targetDeviceHeight, Phaser.AUTO, '');

game.levels = new levels();

game.state.add('Boot', angryMaths.Boot);
game.state.add('Preloader', angryMaths.Preload);
game.state.add('MainMenu', angryMaths.MainMenu);
//game.state.add('Game', angryMaths.Game);
game.state.add("LevelSelect", angryMaths.levelSelect);
game.state.add("PlayLevel", angryMaths.playLevel);
game.state.add("LevelOver", angryMaths.LevelOver);

game.state.start('Boot');