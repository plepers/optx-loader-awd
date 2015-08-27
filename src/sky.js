var setupObj3D = require( './utils').setupObj3D;

module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    sky = new optx.Sky()

    setupObj3D( sky, awdObj, lib )

    var env     = lib.resolve( awdObj.env )

    //Sky.SKY_TYPE_SH
    //Sky.SKY_TYPE_ENV

    var useSH = awdObj.skyType === 0

    sky.fromEnv( env, useSH );

    return sky;
  }

}