
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

var pHearts;
BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		//this.music = this.add.audio('titleMusic');
		//this.music.play();
		this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'titlebackground');
		var heart = this.add.sprite(150, 0, 'heart');
		heart.scale.setTo(12,12);
		this.add.sprite(190, 0, 'titlepage');

		this.playButton = this.add.button(450, 500, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
		//this.state.start('Game');

		pHearts = this.add.emitter(0, 0, 50);
		pHearts.width = 150;
		pHearts.makeParticles('heart');
		pHearts.minParticleSpeed.set(0, 300);
		pHearts.maxParticleSpeed.set(0, 400);
		pHearts.setRotation(0, 360);
		pHearts.setAlpha(1, 0.01, 800);
		pHearts.setScale(0.5, 0.5, 4, 4);
		pHearts.start(false, 2000, 100);
	},

	update: function () {

		//	Do some nice funky main menu effect here
		pHearts.x = this.input.activePointer.position.x;
		pHearts.y = this.input.activePointer.position.y;
	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
