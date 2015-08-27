awdLib        = require( 'awdlib/lib/awdlib_readonly' );
awdLib_optx   = require( 'awdlib/lib/awdlib_optx_readonly' )(awdLib);



var optx;
var handlers;


function initHandlers(  ){
  handlers = {
    handleComposite : require( './compositeTexture'  )( optx, awdLib_optx ),
    handleTexture   : require( './texture'  )( optx, awdLib_optx ),
    handleMaterial  : require( './material' )( optx, awdLib_optx ),
    handleGeometry  : require( './geometry' )( optx, awdLib_optx ),
    handleMesh      : require( './mesh'     )( optx, awdLib_optx ),
    handleLight     : require( './light'    )( optx, awdLib_optx ),
    handleCamera    : require( './camera'   )( optx, awdLib_optx ),
    handlePost      : require( './post'     )( optx, awdLib_optx ),
    handleSky       : require( './sky'      )( optx, awdLib_optx ),
    handleEnv       : require( './env'      )( optx, awdLib_optx )
  }

}


function getHandler( type, nsuri ){
  var EXT = awdLib_optx.extInfos;
  if( nsuri == EXT.URI ){

    switch( type ){
      case EXT.OPTX_GEOM             :
        return handlers.handleGeometry;

      case EXT.OPTX_MESH             :
        return handlers.handleMesh;

      case EXT.OPTX_MATERIAL         :
        return handlers.handleMaterial;

      case EXT.OPTX_TEXTURE          :
        return handlers.handleTexture;

      case EXT.OPTX_COMPOSITE_TEXTURE:
        return handlers.handleComposite;

      case EXT.OPTX_LIGHT            :
        return handlers.handleLight;

      case EXT.OPTX_ENV              :
        return handlers.handleEnv;

      case EXT.OPTX_SKY              :
        return handlers.handleSky;

      case EXT.OPTX_CAMERA           :
        return handlers.handleCamera;

      case EXT.OPTX_POST             :
        return handlers.handlePost;
    }

  }

  return null;
}


function _assertOptx(){
  if( ! optx ) {
    throw new Error( "optx-loader-awd bot initialized, call Loader.init( optx ).");
  }
}

function Loader( buffer ){
  _assertOptx();
  this.buffer = buffer;

  this.basedir = './';
  this.awd = null;


  var _lib = {};
  _lib.resolve = function( awdStruct ){
    if( awdStruct && _lib[awdStruct.id])
      return _lib[awdStruct.id];
    return null;
  }

  this._lib = _lib;
  this._byName = {}

}

Loader.prototype =
{

  load : function( scene )
  {
    this.awd = new awdLib.awd();
    this.awd.addExtension( awdLib_optx.ext.getExtension() );

    console.log( this.buffer.byteLength )

    this.awd.parse( this.buffer );
    console.log( this.buffer.byteLength )

    var structs = this.awd._elements;

    for( var i = 0; i< structs.length ; i++ ) {
      var struct = structs[i];

      console.log( struct.name, struct.nsUri, struct.type )

      var handler = getHandler( struct.type, struct.nsUri );
      if( handler ){
        var optxObj = handler( struct, this._lib, scene );
        this._lib[struct.id ] = optxObj;
        this._byName[struct.name] = optxObj;
      }

    }

  }
};

Loader.init = function( pOptx ){
  optx = pOptx;
  initHandlers();
};

module.exports = Loader;







