'use strict';

/*
 
 */
var Mine = function(game) {
	Phaser.Sprite.call(this, game, 100, 100, 'mine');
	var mineSprite = game.add.existing(this);

	var idleAnim = mineSprite.animations.add('idle', [0, 1], 2, true);
	idleAnim.play();
};

Mine.prototype = Object.create(Phaser.Sprite.prototype);
Mine.prototype.constructor = Mine;

module.exports = Mine;