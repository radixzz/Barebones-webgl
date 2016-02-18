var XHRLoad = function( url, callback ) {
	var request = new XMLHttpRequest();
	request.open( 'GET', url, true );
	request.addEventListener( 'load', function() {
 		callback( request.responseText );
	} );
	request.send();
};

/*
var WGLDemo = ( function( wnd ) {

	var module = {
		initted: false
	};

	var context, shaderProgram;

	var loadShader = function( shaderUrl, type, callback ) {

		if ( ! this.initted ) {
			throw 'WebGL is not initialized';
			return false;
		}

		var shader;
		loadShader( shaderUrl, function( data ) {
			shader = gl.createShader( type );
			gl.shaderSource( shader, data );
			gl.compileShader( shader );

			callback( shader );
		} );
	}

	var loadVertexShader = function( shaderUrl ) {
		this.loadShader( shaderUrl, gl.VERTEX_SHADER, function( shader ) {

		} );
	}

	var loadFragmentShader = function( shaderUrl ) {
		this.loadShader( shaderUrl, gl.VERTEX_SHADER, function( shader ) {

		} );
	}

	module.initialize = function(canvas, callback ) {

		context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		if ( context === null ) {
			throw 'Error creating WebGL context';
		}

		context.clearColor( 0, 0, 0, 1 );
		context.clear( gl.COLOR_BUFFER_BIT );
		
		loadVertexShader( 'vertex.shader' );
		loadFramentShader( 'fragment.shader' );
		shaderProgram = gl.createProgram();
		this.initted = true;
	}

	return module;

} )( this );
*/

var initDemo = function() {
	var renderer = new WebGL.Renderer( 500, 500 );
	document.body.appendChild( renderer.domElement );
	var shader = new WebGL.Shader( vertexSrc, fragmentSrc );
	renderer.addShader( shader );
}
