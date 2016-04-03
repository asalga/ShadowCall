'use strict';

var cfg = require('../config');


/*
	Sprite Template
*/
var Template = function(game, gameState) {
	this.game = game;
	
	Phaser.Sprite.call(this, this.game, 100, 100, 'spriteTemplate');
	var spriteTemplate = this.game.add.existing(this);

	this.properties = {
		player: null,
		score: 100
	};

	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.setSize(this.width, this.height);
	this.body.immovable = false;

	this.body.velocity.y = 20;

	var idleAnim = spriteTemplate.animations.add('idle', [0, 1], 2, true);
	idleAnim.play();
};

Template.prototype = Object.create(Phaser.Sprite.prototype);
Template.prototype.constructor = Template;

Template.prototype.collision = function(other){
};

Template.prototype.update = function() {
};

module.exports = Template;