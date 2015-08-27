var hexToRGB = require( './utils').hexToRGB;


var POST_SHARPEN     = 1,
    POST_BLOOM       = 2,
    POST_VIGNETTE    = 3,
    POST_SATURATION  = 4,
    POST_CONTRAST    = 5,
    POST_GRAIN       = 6,
    POST_REINHARD    = 7,
    POST_HEJL        = 8;


function addEffect( effect, data ){
  console.log( effect, effect.constructor.prototype )
  return;
  if     ( effect._id === POST_SHARPEN    ){
    data.sharpen       = effect.getAmount()
    data.sharpenLimit  = effect.getLimit()
  }
  else if( effect._id === POST_BLOOM      ){
    data.bloomColor    = effect.getColor()
    data.bloomSize     = effect.getSize()
  }
  else if( effect._id === POST_VIGNETTE   ){
    data.vignette      = effect.getColor()
    data.vignetteCurve = effect.getCurve()
  }
  else if( effect._id === POST_SATURATION ){
    data.saturation    = effect.getRgb()
  }
  else if( effect._id === POST_CONTRAST   ){
    data.saturation    = effect.getBrightness()
    data.brightness    = effect.getContrast()
    data.bias          = effect.getBias()
  }
  else if( effect._id === POST_GRAIN      ){
    data.grain         = effect.getAmount()
    data.grainSharpness= effect.getsharpness()
  }
  else if( effect._id === POST_REINHARD   ){
    data.toneMap = 1
  }
  else if( effect._id === POST_HEJL       ){
    data.toneMap = 2
  }
}


module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    var data = {}

    var effects = awdObj.effects

    for( var i=0; i< effects.length; i++ ){
      addEffect( effects[i], data )
    }

    var post = new optx.PostRender( data, true )

    return post;
  }

}