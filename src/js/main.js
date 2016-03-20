var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

game.levels = new levels();

game.state.add('Boot', angryMaths.Boot);
game.state.add('Preloader', angryMaths.Preload);
game.state.add('MainMenu', angryMaths.MainMenu);
game.state.add('Game', angryMaths.Game);
game.state.add("LevelSelect", angryMaths.levelSelect);
game.state.add("PlayLevel", angryMaths.playLevel);

game.state.start('Boot');