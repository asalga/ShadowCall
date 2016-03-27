/*
	General game config
*/

var Config = {

	// META
	version: 0.1,
	debug: true,

	// GAME
	gameWidth: 320,
	gameHeight: 200,
	gameScale: 2,

	// PLAYER
	godMode: false,
	moveSpeed: 5,
	fireDelay: 100,

	// BACKGROUND
	backgroundTilesPerSecond: 0.38,
	
	sideBufferSize: 16
};

module.exports = Config;