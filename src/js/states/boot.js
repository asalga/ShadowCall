'use strict';

var Game = require('./game');
var Assets = require('../assets');

/*
*/

var Boot = function() {};

Boot.prototype = {

	preload: function() {
		console.log('Boot::preload');
		this.load.image('preloadBar', 'build/images/screens/loadingbar.png');
	},

	create: function() {
		console.log('Boot::create');
		this.game.input.maxPointers = 1;
		this.game.stage.smoothed = false;
		this.game.stage.scale.pageAlignHorizontally = true;

		// this.game.load.onLoadStart.add(this.loadStart, this);
		// this.game.load.onFileComplete.add(this.fileComplete, this);
		// this.game.load.onLoadComplete.add(this.loadComplete, this);
		// this.game.load.onLoadComplete.add(this.loadComplete, this);
		// this.start();

		this.game.state.start('Preloader');
	},

	// loadStart: function(){
	//     console.log('Boot::loadstart');
	// },

	// start: function() {
	//     console.log('start');
	//     this.game.stage.backgroundColor = '#336699';
	//     this.game.load.image('titleScreen', 'build/images/test.jpg');
	// },

	// loadComplete: function() {
	//     console.log('Boot::onLoadComplete');
	//     // this.game.state.start('Preloader');
	//     this.game.add.sprite(0, 0, 'titleScreen');
	// }
};

module.exports = Boot;