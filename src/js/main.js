'use strict';

var Boot = require('./states/boot');
var Preloader = require('./states/preloader');
var Game = require('./states/game');
var Assets = require('./assets');
var cfg = require('./config');

var _ = require('lodash');

var pixel = {
	scale: 2,
	game: null,
	canvas: null,
	context: null,
	width: 0,
	height: 0
};

pixel.game = new Phaser.Game(

	cfg.gameWidth,
	cfg.gameHeight,
	Phaser.WEBGL, '', {
		//preload: preload,
		create: create,
		render: render,
		update: update
	}
);


function preload() {
	console.log('preload');
};


function render() {}

function blitPixiToCanvas() {
	pixel.context.drawImage(
		pixel.game.canvas,
		0, 0,
		cfg.gameWidth, cfg.gameHeight,
		0, 0,
		cfg.gameWidth * pixel.scale, cfg.gameHeight * pixel.scale);
}


function update() {
	// console.log(pixel.game.time.fps);
}


function create() {
	console.log('create');
	pixel.game.time.advancedTiming = true;
	
	//game.physics.startSystem(Phaser.Physics.ARCADE);

	//pixel.game.canvas.style['display'] = 'none';
	pixel.game.canvas.id = 'srcCanvas';

	pixel.canvas = Phaser.Canvas.create(null, cfg.gameWidth * pixel.scale, cfg.gameHeight * pixel.scale);
	pixel.canvas.id = 'dstCanvas';

	pixel.context = pixel.canvas.getContext('2d');
	
	// Phaser.Canvas.addToDOM(pixel.canvas);
	var inner = document.getElementsByClassName('inner')[0];
	inner.appendChild(pixel.canvas);

	pixel.game.device.canvasBitBltShift = false;
	pixel.game.stage.backgroundColor = "#000000";

	Phaser.Canvas.setSmoothingEnabled(pixel.context, false);

	pixel.width = pixel.game.width;
	pixel.height = pixel.game.height;

	// States
	pixel.game.state.add('Boot', Boot);
	pixel.game.state.add('Preloader', Preloader);
	pixel.game.state.add('Game', Game);

	pixel.game.state.start('Boot');
};

module.exports = {
	blitPixiToCanvas: blitPixiToCanvas
};