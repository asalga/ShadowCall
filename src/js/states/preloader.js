'use strict';

var Assets = require('../assets');

var Preloader = function(game) {
  this.ready = false;
};

Preloader.prototype = {

  preload: function() {
    console.log('Preloader::preload');

    this.bar = this.add.sprite(101, 52, 'preloadBar');
    this.load.setPreloadSprite(this.bar);

    // IMAGES
    for (var key in Assets.images) {
      this.load.image(key, Assets.images[key]);
    }

    // SPRITE SHEETS
    for (var key in Assets.spritesheets) {
      var sheet = Assets.spritesheets[key];

      this.load.spritesheet(key, sheet.path, sheet.frameWidth, sheet.frameHeight, sheet.frameCount);
    }

    // TILESHEETS
    for (var key in Assets.tilesheets) {
      this.game.load.atlasJSONHash(key, Assets.tilesheets[key].image, Assets.tilesheets[key].atlas);
    }
  },

  create: function() {
    console.log('Preloader::create');

    this.game.load.onLoadStart.add(this.loadStart, this);
    this.load.onLoadComplete.add(this.loadComplete, this);

    this.start();
  },

  start: function() {
    console.log('Preloader::start');
    this.game.load.start();
  },

  loadStart: function() {
    console.log('Preloader::loadStart');
  },

  loadComplete: function() {
    console.log('Preloader::onLoadComplete');
    this.game.state.start('Game');
  }
};

module.exports = Preloader;

/*
Preloader.prototype = {

  preload: function() {
    console.log('Preloader::preload');

    this.asset = this.add.sprite(320, 240, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.game.add.sprite(0, 0, 'preloader');

    // IMAGES
    for (var key in Assets.images) {
      this.load.image(key, Assets.images[key]);
    }

    // TILESHEETS
    for (var key in Assets.tilesheets) {
      this.load.atlasJSONHash(key, Assets.tilesheets[key].image, Assets.tilesheets[key].atlas);
    }

    this.game.load.onLoadStart.add(this.loadStart, this);
    this.game.load.onLoadComplete.addOnce(this.onLoadComplete, this);

    this.load.setPreloadSprite(this.asset);
  },

  create: function() {
    console.log('Preloader::create');
    this.start();
  },

  init: function() {
    console.log('Preloader::init');
    //this.game.load.onLoadStart.add(this.loadStart, this);
  },

  start: function() {
    console.log('Preloader::start');
  },

  loadStart: function() {
    console.log('Preloader::loadStart');
  },

  update: function() {
    console.log('Preloader::update');
    if (!!this.ready) {
      this.game.state.start('Game');
    }
  },

  onLoadComplete: function() {
    console.log('onLoadComplete');
    this.ready = true;
  }
};
*/