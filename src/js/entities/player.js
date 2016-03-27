'use strict';

var cfg = require('../config');

var _ = require('lodash');

/*
 
*/
var Player = function(game, x, y) {

	Phaser.Sprite.call(this, game, x, y, 'ship');
	game.add.existing(this);

	// var mine = this.game.add.sprite(0, 0, 'mine');
	// var idle = mine.animations.add('idle', [0, 1], true);
	// idle.play(2, true);

	// props
	this.health = 0;
	this.nextBullet = 0;
	this.fireRate = cfg.fireRate;
	this.bulletPool = [];
	this.nextFire = 0;

	this.createBulletPool(50);
	// this.resetHealth();

	window.player = this;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

	if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		this.x -= cfg.moveSpeed;
	}

	if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.x += cfg.moveSpeed;
	}

	if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		this.y -= cfg.moveSpeed;
	}

	if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		this.y += cfg.moveSpeed;
	}

	if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		this.fire();
	}

	this.keepInBounds();
};

Player.prototype.fire = function() {
	if (this.nextFire > this.game.time.now) {
		return;
	}

	this.nextFire = this.game.time.now + cfg.fireDelay;

	var bullet = this.bulletPool[this.nextBullet];

	bullet.visible = true;
	bullet.body.position.x = this.position.x + this.width / 2;
	bullet.body.position.y = this.position.y;
	bullet.body.velocity.y = -300;

	this.nextBullet++;
	if (this.nextBullet >= this.bulletPool.length) {
		this.nextBullet = 0;
	}
};

Player.prototype.createBulletPool = function(numBullets) {
	console.log('create pool');
	this.bulletPool = [];

	_.times(numBullets, function() {
		var bullet = this.game.add.sprite(40, 40, 'bullet');
		bullet.visible = false;
		this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
		this.bulletPool.push(bullet);
	}.bind(this));
};

Player.prototype.keepInBounds = function() {
	if (this.x <= cfg.sideBufferSize) {
		this.x = cfg.sideBufferSize;
	}

	if (this.x + this.width >= cfg.gameWidth - cfg.sideBufferSize) {
		this.x = cfg.gameWidth - cfg.sideBufferSize - this.width;
	}

	if (this.y <= 0) {
		this.y = 0;
	}

	if (this.y + this.height > cfg.gameHeight) {
		this.y = cfg.gameHeight - this.height;
	}
};

module.exports = Player;