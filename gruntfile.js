module.exports = function(grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jade');

	grunt.initConfig({

		config: {
			'src': './src',
			'build': './build'
		},

		browserify: {
			app: {
				src: ['<%= config.src %>/game/app.js'],
				dest: '<%= config.build %>/js/app.min.js'
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
				tasks: ['jade']
			},
			jade: {
				files: '<%= config.src %>/templates/*.jade',
				tasks: ['jade']
			}
		}
	});

	grunt.registerTask('default', [
		'browserify',
		'jade',
		'connect:dev',
		'watch'
	]);
};
