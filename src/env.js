var setupObj3D = require( './utils').setupObj3D;

module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    env = new optx.Env()

    setupObj3D( env, awdObj, lib )

    env.envMap     = lib.resolve( awdObj.envMap )
    env.shCoefs    = awdObj.shCoefs
    env.brightness = awdObj.brightness

    return env;
  }

}