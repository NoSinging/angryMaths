var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

game.state.add('Boot', angryMaths.Boot);
game.state.add('Preloader', angryMaths.Preload);
game.state.add('MainMenu', angryMaths.MainMenu);
game.state.add('Game', angryMaths.Game);

game.state.start('Boot');