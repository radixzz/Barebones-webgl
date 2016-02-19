/*
 *  Copyright (c) 2016 Iván Juárez Núñez
 *  This code is under MIT license
 *	https://github.com/radixzz/Barebones-webgl
 */

var WebGL = WebGL || {};

WebGL.Shader = ( function( vertexSrc, fragmentSrc ) {
	
	var glVertexShader;
	var glFragmentShader;
	var uniforms;
	var attributes;
	var program;
	var _gl;

	function compileShader( src, type ) {

		var cshader = _gl.createShader( type );
		_gl.shaderSource( cshader, src );
		_gl.compileShader( cshader );

		if ( ! _gl.getShaderParameter( cshader, _gl.COMPILE_STATUS ) ) {
            throw "Compile error: " + _gl.getShaderInfoLog( cshader );
        }

		return cshader;
	}

	function compileProgram() {
		
		program = _gl.createProgram();
		glVertex = compileShader( vertexSrc, _gl.VERTEX_SHADER );
		glFragment = compileShader( fragmentSrc, _gl.FRAGMENT_SHADER );
		_gl.attachShader( program, glVertex );
		_gl.attachShader( program, glFragment );
		_gl.linkProgram( program );

	}

	// Map from https://github.com/mrdoob/three.js/wiki/Uniforms-types
	function setUniform( type, name, val ) {

		if ( ! uniforms ) {
			console.warn('Cannot set uniform: shader is not initialized');
			return;
		}

		var u = uniforms[name];

		if ( ! u ) {
			throw 'Unknown uniform name: ' + name;
		}

		switch (type) {

			case '1i':
		        _gl.uniform1i( u.location, val );
		        break;

		    case '1f':
		        _gl.uniform1f( u.location, val );
		        break;

		    case '2f':
		        _gl.uniform2f( u.location, val[ 0 ], val[ 1 ] );
		        break;

		    case '3f':
		        _gl.uniform3f( u.location, val[ 0 ], val[ 1 ], val[ 2 ] );
		        break;

		    case '4f':
		        _gl.uniform4f( u.location, val[ 0 ], val[ 1 ], val[ 2 ], val[ 3 ] );
		        break;

		    case '1iv':
		        _gl.uniform1iv( u.location, val );
		        break;

		    case '3iv':
		        _gl.uniform3iv( u.location, val );
		        break;

		    case '1fv':
		        _gl.uniform1fv( u.location, val );
		        break;

		    case '2fv':
		        _gl.uniform2fv( u.location, val );
		        break;

		    case '3fv':
		        _gl.uniform3fv( u.location, val );
		        break;

		    case '4fv':
		        _gl.uniform4fv( u.location, val );
		        break;

		    case 'Matrix3fv':
		        _gl.uniformMatrix3fv( u.location, false, val );
		        break;

		    case 'Matrix4fv':
		        _gl.uniformMatrix4fv( u.location, false, val );
		        break;

		    default:
		    	throw 'Unknown uniform type:' + type;
				
		}

	}

	function setAttribute( type, name, val ) {

		if ( ! attributes ) {
			console.warn('Cannot set attribute: shader is not initialized');
			return;
		}

		var a = attributes[name];

		if ( ! a ) {
			throw 'Unknown attribute name: ' + name;
		}

		switch (type) {

			case '1f':
		        _gl.vertexAttrib1f( a.location, val );
		        break;

	        case '2f':
	        	_gl.vertexAttrib2f( a.location, val[0], val[1] );
	        	break;

        	case '3f':
        		_gl.vertexAttrib3f( a.location, val[0], val[1], val[2] );
        		break;

        	case '4f':
        		_gl.vertexAttrib4f( a.location, val[0], val[1], val[2], val[3] );
        		break;

	        case '1fv':
	        	_gl.vertexAttrib1fv( a.location, val );
	        	break;

	        case '2fv':
	        	_gl.vertexAttrib2fv( a.location, val );
	        	break;

	        case '3fv':
	        	_gl.vertexAttrib3fv( a.location, val );
	        	break;

	        case '4fv':
	        	_gl.vertexAttrib4fv( a.location, val );
	        	break;

	        default:
	        	throw 'Unknown attribute type: ' + type;
        }

	}

	function mapShaderQualifiers( type ) {

		var m = {};
		var s = type === _gl.ACTIVE_UNIFORMS ? 'Uniform' : 'Attrib';
		var count = _gl.getProgramParameter( program, type );
		
		for ( var idx = count; idx--; ) {
			var a = _gl['getActive' + s ]( program, idx );
			m[ a.name ] = {
				type: a.type,
				size: a.size,
				location: _gl['get' + s + 'Location']( program, a.name )
			};
		}

		return m;
	}

	function compile( gl ) {
		_gl = gl;
		compileProgram();
		uniforms = mapShaderQualifiers( _gl.ACTIVE_UNIFORMS );
		attributes = mapShaderQualifiers( _gl.ACTIVE_ATTRIBUTES );
	}

	function useProgram() {

		_gl.useProgram( program );

	}

	this.program = program;
	this.compile = compile;
	this.useProgram = useProgram;
	this.setAttribute = setAttribute;

} );