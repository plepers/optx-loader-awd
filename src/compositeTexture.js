module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;


    var comps = []
    var acomps = awdObj.components
    for( var i=0; i<acomps.langth; i++ ){
      var c = acomps[i]
      comps.push({
        out :   c.out,
        comps : c.comps,
        tex   : lib.resolve( c.tex ),
      })
    }


    var tex = gl.textureCache.composite(
      comps,
      {}
    )

    return tex;

  }

}