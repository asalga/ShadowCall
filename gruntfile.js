'use strict';

/*

*/

module.exports = function(grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({

		// Don't prefix with  "./" If you do, grunt watch
		// won't watch newly added dirs and files.
		config: {
			'assets': 'assets',
			'src': 'src',
			'build': 'build'
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
					base: './'
				}
			}
		},

		// CLEAN
		clean: ['<%= config.build %>'],

		// UGLIFY
		uglify: {
			options: {
				maxLineLen: 128
			},
			target: {
				files: {
					'build/js/main.min.js': ['build/js/main.min.js']
				}
			}
		},

		// COPY
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

					// DATA
					{
						expand: true,
						cwd: 'assets/images/',
						src: ['*.json'],
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

		// JADE
		jade: {
			compile: {
				options: {
					data: {}
				},
				files: {
					'index.html': ['<%= config.src %>/templates/index.jade']
				}
			}
		},

		// WATCH
		watch: {
			options: {
				livereload: true
			},
			assets: {
				files: '<%= config.assets %>/**/*',
				tasks: ['copy:dev']
			},
			js: {
				files: '<%= config.src %>/**/*',
				tasks: ['browserify']
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

	grunt.registerTask('build', [
		'clean',
		'browserify',
		'jade',
		'uglify',
		'copy'
	])
};