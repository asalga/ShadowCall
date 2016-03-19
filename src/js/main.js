'use strict';

var Boot = require('./states/boot');
var Game = require('./states/game');

var _ = require('lodash');
var Assets = require('./assets');

window.pixel = {
	scale: 3,
	canvas: null,
	context: null,
	width: 0,
	height: 0
};

var baseWidth = 320;
var baseHeight = 220;

window.pixel.game = new Phaser.Game(
	baseWidth,
	baseHeight,
	Phaser.WEBGL, '', {
		preload: preload,
		create: create,
		render: render,
		update: update
	});

function preload() {
	console.log('preload');
	pixel.game.time.advancedTiming = true;

	window.pixel.game.canvas.style['display'] = 'none';
	window.pixel.canvas = Phaser.Canvas.create(null, baseWidth * window.pixel.scale, baseHeight * window.pixel.scale);
	window.pixel.context = window.pixel.canvas.getContext('2d');
	Phaser.Canvas.addToDOM(window.pixel.canvas);
	// window.pixel.game.load.image('img', Assets.images.tilesheet1);

	window.pixel.game.device.canvasBitBltShift = false;

	// Phaser.Canvas.setSmoothingEnabled(this.game.context, false)
	// window.pixel.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

	pixel.game.stage.backgroundColor = "#336699";

	Phaser.Canvas.setSmoothingEnabled(pixel.context, false);

	pixel.width = pixel.game.width;
	pixel.height = pixel.game.height;

	// IMAGES
	for (var key in Assets.images) {
		this.game.load.image(key, Assets.images[key]);
	}

	// TILESHEETS
	for (var key in Assets.tilesheets) {
		this.game.load.atlasJSONHash(key, Assets.tilesheets[key].image, Assets.tilesheets[key].atlas);
	}
};

function render() {
	pixel.context.drawImage(
		// window.pixel.game,
		pixel.game.canvas,
		0, 0,
		baseWidth, baseHeight,
		0, 0,
		baseWidth * pixel.scale, baseHeight * pixel.scale);
}


function update() {
	// console.log(window.pixel.game.time.fps);
}

function create() {
	//pixel.game.add.image(0, 0, 'img');
	pixel.game.state.add('Boot', Boot);
	pixel.game.state.add('Game', Game);
	// preload
	// splash
	// intro
	// menu
	pixel.game.state.start('Boot');
};

module.exports = render;