var initDemo = function() {
	var renderer = new WebGL.Renderer( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var fShader = document.getElementById('shader-fs').textContent;
	var vShader = document.getElementById('shader-vs').textContent;

	var shader = new WebGL.Shader( vShader, fShader );

	renderer.addShader( shader );
	
	renderer.setClearColor( 0, 0, 0, 1 );
	renderer.clear();
	
	var points = [];

	function render() {
		
		renderer.clear();
		for (var idx = 0, len = points.length; idx < len; idx ++ ) {
			var p = points[idx];
			shader.setAttribute( '3f', 'a_Position', [ p.x, p.y, 0 ] );
			shader.setUniform('4f', 'u_FragColor', [ p.r, p.g, p.b, 1 ] );	
			renderer.render();
		}

		window.requestAnimationFrame(render);
	}

	function get2DCoords( x, y, width, height ) {
		var x = ( x - width * 0.5 ) / ( width * 0.5 );
		var y = ( height * 0.5 - y ) / ( height * 0.5 );
		return [x, y];
	}

	renderer.domElement.onmousedown = function( event ) {
		
		var coords = get2DCoords( event.clientX, event.clientY, 
			renderer.domElement.width, renderer.domElement.height );
		var p = {
			x: coords[0],
			y: coords[1],
			r: Math.random(),
			g: Math.random(),
			b: Math.random(),
		}
		points.push( p );
		render();
		
	}
}
