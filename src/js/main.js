'use strict';

var Boot = require('./states/boot');
var Preloader = require('./states/preloader');
var Game = require('./states/game');

/* 
	Overlay canvases [DONE]
	Fix preloader []
*/

var _ = require('lodash');
var Assets = require('./assets');

var baseWidth = 320;
var baseHeight = 200;

var pixel = {
	scale: 2,
	game: null,
	canvas: null,
	context: null,
	width: 0,
	height: 0
};







pixel.game = new Phaser.Game(
	baseWidth,
	baseHeight,
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


function render() {
}

function blitPixiToCanvas() {
	pixel.context.drawImage(
		pixel.game.canvas,

		0, 0,
		baseWidth, baseHeight,

		0, 0,
		baseWidth * pixel.scale, baseHeight * pixel.scale);
}


function update() {
	// console.log(pixel.game.time.fps);
}


function create() {
	console.log('create');
	pixel.game.time.advancedTiming = true;

	//pixel.game.canvas.style['display'] = 'none';
	pixel.game.canvas.id = 'srcCanvas';

	pixel.canvas = Phaser.Canvas.create(null, baseWidth * pixel.scale, baseHeight * pixel.scale);
	pixel.canvas.id = 'dstCanvas';


	pixel.context = pixel.canvas.getContext('2d');
	Phaser.Canvas.addToDOM(pixel.canvas);

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
	blitPixiToCanvas : blitPixiToCanvas
};