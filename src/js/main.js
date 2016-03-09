'use strict';

var Boot = require('./states/boot');
var Game = require('./states/game');

var _ = require('lodash');
var Assets = require('./assets');

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
	preload: preload,
	create: create,
	// update: update
});

function preload() {
	console.log('preload');

	for (var key in Assets.images) {
		game.load.image(key, Assets.images[key]);
	}
};

function create() {
	game.state.add('Boot', Boot);
	// preload
	// splash
	// intro
	// menu
	game.state.add('Game', Game);

	game.state.start('Boot');
};