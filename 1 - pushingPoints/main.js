var initDemo = function() {
	var renderer = new WebGL.Renderer( 500, 500 );
	document.body.appendChild( renderer.domElement );

	var fShader = document.getElementById('shader-fs').textContent;
	var vShader = document.getElementById('shader-vs').textContent;

	var shader = new WebGL.Shader( vShader, fShader );

	renderer.addShader( shader );
	shader.setAttribute('3f', 'a_Position', [0, 0, 0]);
	
	renderer.setClearColor( 0, 0, 0, 1 );
	renderer.clear();
	

	var points = [];

	function render() {
		
		renderer.clear();

		for (var idx = 0, len = points.length; idx < len; idx += 2 ) {
			shader.setAttribute( '3f', 'a_Position', [ points[ idx ], points[ idx + 1 ], 0 ] );
			renderer.render();
		}
		
	}

	function get2DCoords( x, y, width, height ) {
		var x = ( x / width ) - 1;
		var y = ( y / height ) + 1;
		return [x, y];
	}

	renderer.domElement.onmousedown = function( event ) {
		
		var coords = get2DCoords( event.clientX, event.clientY, 
			renderer.domElement.width, renderer.domElement.height );
		
		points.push( coords.x );
		points.push( coords.y );
		render();
		//console.log('click!', event.clientX / w - 0.5 , event.clientY / h - 0.5);
	}
}
