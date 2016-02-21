/*
 *  Copyright (c) 2016 Iván Juárez Núñez
 *  This code is under MIT license
 *	https://github.com/radixzz/Barebones-webgl
 */

var WebGL = WebGL || {};

WebGL.VertexBuffer = ( function( gl, data, drawMode ) {
	var vertexData = new Float32Array(data);
	return new WebGL.Buffer( gl, vertexData, gl.ARRAY_BUFFER, drawMode );
} );

WebGL.Buffer = ( function( gl, data, bufferType, drawMode ) {
	
	var buffer = gl.createBuffer();

	function write( data ) {
		gl.bufferData( bufferType, data, drawMode );
	}

	function bind() {
		gl.bindBuffer( type, buffer );
	}

	function destroy() {
		gl.deleteBuffer( buffer );
	}

	bind();
	write( data );

	this.write = write;
	this.bind = bind;
	this.destroy = destroy;
} );