/*
 *  Copyright (c) 2016 Iván Juárez Núñez
 *  This code is under MIT license
 *	https://github.com/radixzz/Barebones-webgl
 */

var WebGL = WebGL || {};

WebGL.Shader = ( function( vertexSrc, fragmentSrc ) {
	
	var glVertexShader;
	var glFragmentShader;
	var program;

	function compileShader( gl, src, type ) {
		var cshader = gl.createShader( type );
		gl.shaderSource( cshader, src );
		gl.compileShader( cshader );
		return cshader;
	}

	function compileProgram( gl ) {
		program = gl.createProgram();
		glVertex = compileShader( vertexSrc, gl.VERTEX_SHADER );
		glFragment = compileShader( fragmentSrc, gl.FRAGMENT_SHADER );
		gl.attachShader( program, glVertex );
		gl.attachShader( program, glFragment );
		gl.linkProgram( program );
	}

	function useProgram( gl ) {
		gl.useProgram( program );
	}

	this.program = program;
	this.useProgram = useProgram;
	this.compileProgram = compileProgram;
} );