'use strict';

var _ = require('lodash');

/*
	Follows and tries to collide with the player
 */
var Mine = function(game) {
	Phaser.Sprite.call(this, game, 100, 100, 'mine');
	var mineSprite = game.add.existing(this);

	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.setSize(this.width, this.height);
	this.body.immovable = false;

	var idleAnim = mineSprite.animations.add('idle', [0, 1], 2, true);
	idleAnim.play();
};

Mine.prototype = Object.create(Phaser.Sprite.prototype);
Mine.prototype.render = function(){
	console.log('render');
}

Mine.prototype.update = function(){
	// console.log('update');
};

// var test = {
// 	render: function(){
// 		console.log('test');
// 	}
// 	// constructor: Mine
// };



// _.defaults(Mine, test);

// Mine.prototype.constructor = Mine;

module.exports = Mine;