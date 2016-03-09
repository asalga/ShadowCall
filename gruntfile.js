module.exports = function(grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.initConfig({

		config: {
			'assets': 'assets',
			'src': './src',
			'build': './build'
		},

		browserify: {
			app: {
				src: ['<%= config.src %>/js/main.js'],
				dest: '<%= config.build %>/js/main.min.js'
			}
		},

		connect: {
			dev: {
				options: {
					port: 8080,
					base: '<%= config.build %>'
				}
			}
		},

		clean: ['<%= config.build %>'],

		copy: {
			dev: {
				files: [

					// IMAGES
					{
						expand: true,
						cwd: 'assets/images/',
						src: ['**'],
						dest: '<%= config.build %>/images/'
					},

					// CSS
					{
						expand: true,
						cwd: './css/',
						src: ['**'],
						dest: '<%= config.build %>/css/'
					},

					// LIBS
					{
						expand: true,
						cwd: './lib/',
						src: ['**'],
						dest: '<%= config.build %>/lib/'
					}
				]
			}
		},

		jade: {
			compile: {
				options: {
					data: {}
				},
				files: {
					'<%= config.build %>/index.html': ['<%= config.src %>/templates/index.jade']
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			js: {
				files: '<%= config.src %>/**/*.js',
				tasks: ['browserify', 'jade']
			},
			jade: {
				files: '<%= config.src %>/templates/*.jade',
				tasks: ['jade']
			},
			css: {
				files: 'css/*.css',
				tasks: ['copy:dev']
			}
		}
	});

	grunt.registerTask('default', [
		'clean',
		'browserify',
		'jade',
		'copy',
		'connect',
		'watch'
	]);
};