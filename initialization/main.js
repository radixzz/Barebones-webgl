

var WGLDemo = ( function( wnd ) {

	var module = {
		initted: false
	};

	var gl, shaderProgram;
	
	var loadShader = function( url, callback ) {
		var request = new XMLHttpRequest();
		request.open( 'GET', url, true );
		request.addEventListener( 'load', function() {
     		callback( request.responseText );
  		} );
  		request.send();
	}

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

		gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		if ( gl === null ) {
			throw 'Error creating WebGL context';
		}

		gl.clearColor( 0, 0, 0, 1 );
		gl.clear( gl.COLOR_BUFFER_BIT );
		
		loadVertexShader( 'vertex.shader' );
		loadFramentShader( 'fragment.shader' );
		shaderProgram = gl.createProgram();
		this.initted = true;
	}

	return module;

} )( this );

var initDemo = function() {
	var canvasElement = document.getElementById( 'target' );
	WGLDemo.initialize( canvasElement );
	
}
