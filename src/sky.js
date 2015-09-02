var setupObj3D = require( './utils').setupObj3D;

module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    sky = new optx.Sky()

    // setupObj3D( sky, awdObj, lib, scene )
    sky.transform.set( awdObj.matrix )
    sky.name = awdObj.name;

    var env     = lib.resolve( awdObj.env )


    // todo pivot?

    //Sky.SKY_TYPE_SH
    //Sky.SKY_TYPE_ENV

    var useSH = awdObj.skyType === 0

    sky.fromEnv( env, useSH );

    if( awdObj.parent ){
      var op = lib.resolve( awdObj.parent )
      op.add( sky )
    } else {
      scene.add( sky )
    }

    return sky;
  }

}