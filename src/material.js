var hexToRGB = require( './utils').hexToRGB;

module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    var fileData = awdObj.fileData,
        name      = awdObj.name,
        uri       = awdObj.uri;

    var mat = new optx.PBRMaterial();


    mat.name             = awdObj.name

    mat.blend            = awdObj.blend
    mat.alphaThreshold   = awdObj.alphaThreshold

    if( awdObj.dithering ) {
      mat.dithering        = awdObj.dithering
      mat.fresnel.fromArray( awdObj.fresnel )
      mat.horizonOcclude   = awdObj.horizonOcclude
      mat.vertexColor      = awdObj.vertexColor
      mat.vertexColorAlpha = awdObj.vertexColorAlpha
      mat.vertexColorSRGB  = awdObj.vertexColorSRGB
    }

    if( awdObj.aniso ) {
      mat.aniso            = awdObj.aniso
      mat.anisoStrength    = awdObj.anisoStrength
      mat.anisoIntegral    = awdObj.anisoIntegral
      mat.anisoTangent.fromArray( awdObj.anisoTangent )
    }

    if( awdObj.subsurface ) {
      mat.subSurfaceScattering = awdObj.subsurface
      mat.fresnelOcc           = awdObj.fresnelOcc
      mat.fresnelGlossMask     = awdObj.fresnelGlossMask
      mat.transSky             = awdObj.transSky
      mat.shadowBlur           = awdObj.shadowBlur
      mat.normalSmooth         = awdObj.normalSmooth
      mat.unlit                = awdObj.unlit

      mat.subsurfaceColor.fromArray( awdObj.subsurfaceColor )
      mat.transColor.fromArray(      awdObj.transColor )
      mat.fresnelColor.fromArray(    awdObj.fresnelColor )
    }


    mat.albedo       = lib.resolve( awdObj.textures.albedo       );
    mat.reflectivity = lib.resolve( awdObj.textures.reflectivity );
    mat.normal       = lib.resolve( awdObj.textures.normal       );
    mat.subsurface   = lib.resolve( awdObj.textures.subsurface   );
    mat.agt          = lib.resolve( awdObj.textures.agt          );


    mat.albedoColor       = hexToRGB( awdObj.colors.albedo       );
    mat.reflectivityColor = hexToRGB( awdObj.colors.reflectivity );
    mat.normalColor       = hexToRGB( awdObj.colors.normal       );
    mat.subsurfaceColor   = hexToRGB( awdObj.colors.subsurface   );
    mat.agtColor          = hexToRGB( awdObj.colors.agt          );

    return mat;
  }

}