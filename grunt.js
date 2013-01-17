/*global module:false*/
module.exports = function(grunt){
	grunt.initConfig({
		lint: {
			files : [
				'grunt.js',
				'src/jquery-1.8.2.js',
				'src/jquery-ui-1.9.1.custom.js',
				'src/jquery-parallax-plugin2.js'
			]
		},
		watch : {
		    dist : {
		    	files : [
		    	    'src/jquery-ui-1.9.1.custom.js',
					'src/jquery-parallax-plugin2.js'
		    	],
		    	tasks:'concat min'
		    },
		    css : {
		    	files : [
					'src/jquery-ui-1.9.1.custom.css',
					'src/jquery-parallax-plugin2.css'
		    	],
		    	tasks:'concat'
		    },
		    less : {
		    	files : [
		    	       'demo/style.less'
		    	],
		    	tasks:'less'
		    }
		},
		less : {
			dist : {
				src : ['demo/style.less'],
				dest : 'demo/style.css'
			}
		},
		concat:  {
			dist : {
				src : [
					'src/jquery-ui-1.9.1.custom.js',
					'src/jquery-parallax-plugin2.js'
				],
				dest : 'jquery-parallax-plugin2.js'
			},
			css : {
				src : [
					'src/jquery-ui-1.9.1.custom.css',
					'src/jquery-parallax-plugin2.css'
				],
				dest : 'jquery-parallax-plugin2.css'
			}
		},
		cssmin : {
			dist : {
				src : ['jquery-parallax-plugin2.css'],
				dest : 'jquery-parallax-plugin2.min.css'
			}
		},
		min: {
			dist :{
				src : ['jquery-parallax-plugin2.js'],
				dest : 'jquery-parallax-plugin2.min.js'
			}
		}
	});
	  grunt.registerTask('default', 'concat min cssmin less');
};