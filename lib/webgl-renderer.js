/*
 *  Copyright (c) 2016 Iván Juárez Núñez
 *  This code is under MIT license
 *  https://github.com/radixzz/Barebones-webgl
 */

var WebGL = WebGL || {};

WebGL.Renderer = ( function( width, height ) {

	var domElement = document.createElement( 'canvas' );
	var context;
	var width;
	var height;
	var _shader;
	var _clearColor = { r: 0, g: 0, b: 0, a: 0 };

	function resize( width, height ) {
		width = width;
		height = height;
		domElement.width = width;
		domElement.height = height;
	}

	function getContext() {
		if ( ! context ) {
			try {
				context = domElement.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' );
			} catch( e ) { }

			if ( ! context ) {
				context = null;
				throw 'Either your browser or graphics card doesn\'t support WebGL.';
			}
		}
		return context;
	}

	function addShader( shader ) {
		if ( shader instanceof WebGL.Shader ) {
			_shader = shader;
			shader.compileProgram( context );
			shader.useProgram( context );
		}
	}

	function setClearColor( r, g, b, a ) {
		_clearColor.r = r || 0;
		_clearColor.g = g || 0;
		_clearColor.b = b || 0;
		_clearColor.a = a || 1;
	}

	function clear() {

		context.clearColor(
			_clearColor.r,
			_clearColor.g,
			_clearColor.b,
			_clearColor.a
		);
		context.clear( context.COLOR_BUFFER_BIT );

	}

	function render() {
		//context.drawArrays( context.POINTS, 0, 1 );
	}

	( function( width, height ) {

		ctx = getContext();
		resize( width || 300, height || 150 );

	})( width, height );

	this.domElement = domElement;
	this.addShader = addShader;
	this.setClearColor = setClearColor;
	this.clear = clear;
	this.render = render;

} );