var setupObj3D = require( './utils').setupObj3D;

module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    if( awdObj.lensType == 0 )
    {
      camera = new optx.Camera.PerspectiveCamera();
      camera.fov = awdObj.fov;
    }
    else
    {
      camera = new optx.Camera.OrthoCamera();
      camera.setViewport(
        awdObj.minX,
        awdObj.maxX,
        awdObj.minY,
        awdObj.maxY
      )
    }


    setupObj3D( camera, awdObj, lib );

    camera.nearPlane = awdObj.near
    camera.farPlane  = awdObj.far

    camera.post = lib.resolve( awdObj.post )

    return camera;
  }

}