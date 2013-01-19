/*global module:false*/
module.exports = function(grunt){
	grunt.initConfig({
		lint: {
			files : [
				'grunt.js',
				'src/jquery.loadprogress.js'
			]
		},
		watch : {
			dist : {
				files : [
					'src/jquery.loadprogress.js'
				],
				tasks:'concat min'
			},
			css : {
				files : [
					'src/jquery.loadprogress.css'
				],
				tasks:'concat'
			}
		},
		concat:  {
			dist : {
				src : [
					'src/jquery.loadprogress.js'
				],
				dest : 'jquery.loadprogress.js'
			},
			css : {
				src : [
					'src/jquery.loadprogress.css'
				],
				dest : 'jquery.loadprogress.css'
			}
		},
		cssmin : {
			dist : {
				src : ['jquery.loadprogress.css'],
				dest : 'jquery.loadprogress.min.css'
			}
		},
		min: {
			dist :{
				src : ['jquery.loadprogress.js'],
				dest : 'jquery.loadprogress.min.js'
			}
		}
	});
	  grunt.registerTask('default', 'concat min cssmin');
};