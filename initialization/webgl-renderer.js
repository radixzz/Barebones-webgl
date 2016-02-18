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
	var clearColor;

	function resize( width, height ) {
		width = width;
		height = height;
		domElement.width = width;
		domElement.height = height;
	}

	function getContext() {
		if ( ! context ) {
			try
				context = domElement.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' );
			} catch( e ) { }

			if ( ! context ) {
				context = null;
				throw 'Either your browser or graphics card doesn\'t support WebGL.';
			}
		}
		return context;
	}

	function setClearColor() {

	}

	function clear() {

	}

	( function( width, height ) {

		ctx = getContext();
		resize( width || 300, height || 150 );

	})( width, height );

	return {
		domElement: domElement,
		getContext: getContext,
		resize: resize
	};
} );