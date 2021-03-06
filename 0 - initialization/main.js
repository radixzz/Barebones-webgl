var initDemo = function() {
	var renderer = new WebGL.Renderer( 500, 500 );
	document.body.appendChild( renderer.domElement );

	var fShader = document.getElementById('shader-fs').textContent;
	var vShader = document.getElementById('shader-vs').textContent;

	var shader = new WebGL.Shader( vShader, fShader );

	renderer.addShader( shader );
	shader.setAttribute('3f', 'a_Position', [0, 0, 0]);
	
	renderer.setClearColor( 1, 0, 0, 1 );
	renderer.clear();
	renderer.render();
}
