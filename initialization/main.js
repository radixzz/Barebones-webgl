
var XHRLoad = function( url, callback ) {
	var d = Q.defer();
	var request = new XMLHttpRequest();
	request.open( 'GET', url, true );
	request.addEventListener( 'load', function() {
		d.resolve( request.responseText );
	} );
	request.send();
	return d.promise;
};

var loadShaders = function( renderer ) {
	
	var xhrJob = [ 
		XHRLoad('vertex.shader'),
		XHRLoad('fragment.shader')
	];

	Q.when( xhrJob ).then( function( vShader, fShader ) {
		var shader = new WebGL.Shader( vShader, fShader );
		renderer.addShader( shader );
	});	
}

var initDemo = function() {
	var renderer = new WebGL.Renderer( 500, 500 );
	document.body.appendChild( renderer.domElement );
	loadShaders( renderer );
	renderer.setClearColor( 1, 0, 0, 1 );
	renderer.clear();
	renderer.render();
}
