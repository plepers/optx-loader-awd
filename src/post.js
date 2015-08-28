var hexToRGB = require( './utils').hexToRGB;


var POST_SHARPEN     = 1,
    POST_BLOOM       = 2,
    POST_VIGNETTE    = 3,
    POST_SATURATION  = 4,
    POST_CONTRAST    = 5,
    POST_GRAIN       = 6,
    POST_REINHARD    = 7,
    POST_HEJL        = 8;




module.exports = function( optx ){

  var Post       = optx.Post       ,
      Bloom      = Post.Bloom      ,
      Sharpen    = Post.Sharpen    ,
      Vignette   = Post.Vignette   ,
      Contrast   = Post.Contrast   ,
      Saturation = Post.Saturation ,
      Grain      = Post.Grain      ,
      Lut        = Post.Lut        ,
      TMReinhard = Post.TMReinhard ,
      TMHejl     = Post.TMHejl     ;



  function getEffect( effect, data ){

    if     ( effect._id === POST_SHARPEN    )
    {
      return new Sharpen(
        effect.getAmount(),
        effect.getLimit()
      )
    }

    else if( effect._id === POST_BLOOM      )
    {
      return new Bloom(
        effect.getColor(),
        effect.getSize()
      )
    }

    else if( effect._id === POST_VIGNETTE   )
    {
      var c = effect.getColor()
      return new Vignette(
        c.slice( 0, 3 ),
        c[3],
        effect.getCurve()
      )
    }

    else if( effect._id === POST_SATURATION )
    {
      return new Saturation( effect.getRgb() )
    }

    else if( effect._id === POST_CONTRAST   )
    {
      return new Contrast(
        effect.getBrightness(),
        effect.getContrast(),
        effect.getBias()
      )
    }

    else if( effect._id === POST_GRAIN      )
    {
      return new Grain(
        effect.getAmount(),
        effect.getsharpness()
      )
    }

    else if( effect._id === POST_REINHARD   )
    {
      return new TMReinhard()
    }

    else if( effect._id === POST_HEJL       )
    {
      return new TMHejl()
    }

  }


  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    var data = {}

    var awdEffects = awdObj.effects,
        effects = [];

    for( var i=0; i< awdEffects.length; i++ ){
      effects.push( getEffect( awdEffects[i], data ) )
    }

    var post = new optx.Post( effects, true )

    return post;
  }

}