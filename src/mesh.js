var setupObj3D = require( './utils').setupObj3D;

module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    var mesh = new optx.Mesh();
    var geom = lib.resolve( awdObj.geometry       );

    setupObj3D( mesh, awdObj, lib );

    mesh.geometry = geom;

    mesh.cullBackFaces = awdObj.getCullBackFace()
    mesh.castShadows   = awdObj.getCastShadows()

    var subs = awdObj.submeshes

    for (var j = 0; j < subs.length; ++j ) {
      var subData = subs[j]

      var mat =  lib.resolve( subData.material );
      mesh.setMaterialAt( mat, j );

      mesh.addSubmesh(
        subData.firstIndex    ,
        subData.indexCount    ,
        subData.firstWireIndex,
        subData.wireIndexCount
      );

    }

    return mesh;
  }

}