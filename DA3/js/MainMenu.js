"use strict";

BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {
	
	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic');
		this.music.play();

		this.add.sprite(0, 0, 'titlePage');

		this.playButton = this.add.button( 303, 400, 'playButton', this.startGame, this, 'over', 'out', 'down');
		this.clickcount = 0;
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();
		if (this.clickcount <= 0){
			this.add.sprite(0, 0, 'instructions');
			this.clickcount ++;
			this.playButton = null;
			this.playButton = this.add.button( 303, 500, 'playButton', this.startGame, this, 'over', 'out', 'down');
		}else{
			//	And start the game
			this.state.start('Game');
		}

	}

};
