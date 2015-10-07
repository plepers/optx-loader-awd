var setupObj3D = require( './utils').setupObj3D;

function normalizeSH( sh ){
  var res = new Float32Array( 36 );
  for( var i=0; i< 9; i++ ){
    res[i*4+0] = sh[i*3+0]
    res[i*4+1] = sh[i*3+1]
    res[i*4+2] = sh[i*3+2]
    res[i*4+3] = 0.0
  }
  return res;
}

module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene, rscene ){

    var gl = scene.gl;

    env = new optx.Env()

    setupObj3D( env, awdObj, lib, rscene )

    env.envMap     = lib.resolve( awdObj.envMap )
    env.envMap.mipmap = false
    var sh = awdObj.shCoefs

    if( sh.length === 27 ){
      sh = normalizeSH( sh )
    }

    env.shCoefs    = sh
    env.brightness = awdObj.brightness

    return env;
  }

}