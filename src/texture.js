module.exports = function( optx ){

  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;

    var fileData = awdObj.fileData,
        name      = awdObj.name,
        uri       = awdObj.uri,
        infos     = awdObj.infos;

    var tex = null;

    var glFormat = infos.glformat

    // todo do some sanity check
    // if filedata is raw , width and height must be available

    var params = {}
    if( infos.width )
      params.width = infos.width
    if( infos.height )
      params.height = infos.height

    params.mipmap = true
    params.aniso = gl.quality.aniso


    if( fileData ){
      var data = new Uint8Array( fileData.data.buffer, fileData.data.byteOffset, fileData.data.byteLength )
      fileData.data = data;
      console.log( uri )
      tex = gl.textureCache.fromData( fileData, params, glFormat );
    }
    else {
      throw new Error( 'TODO - handle externa uri in awd' )
    }

    return tex;
  }

}