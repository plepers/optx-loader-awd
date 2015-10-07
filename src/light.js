var setupObj3D = require( './utils').setupObj3D;

module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene,rscene ){

    var gl = scene.gl;

    if( awdObj.spotAngle <= 0 ){
      light = new optx.Light.DirectionalLight();
    } else {
      light = new optx.Light.SpotLight();
    }


    light.radius        = awdObj.radius
    light.falloffCurve  = awdObj.falloffCurve
    light.spotAngle     = awdObj.spotAngle
    light.spotSharpness = awdObj.spotSharpness

    light.castShadows = awdObj.shadow

    light.color.set( awdObj.color )

    lib.lights.push( light )

    setupObj3D( light, awdObj, lib, rscene );

    return light;
  }

}