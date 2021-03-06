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
  this._lib.lights = []
  this._lib.meshes = []
  this._byName = {}
  this._objects = []

}

Loader.prototype =
{

  load : function( scene )
  {
    var EXT = awdLib_optx.extInfos;

    this.awd = new awdLib.awd();
    this.awd.addExtension( awdLib_optx.ext.getExtension() );

    console.log( this.buffer.byteLength )

    this.awd.parse( this.buffer );
    console.log( this.buffer.byteLength )

    var structs = this.awd._elements;

    var container = new optx.Object3D()
    this.container = container;
    container.gl = scene.gl

    for( var i = 0; i< structs.length ; i++ ) {
      var struct = structs[i];

      if( struct.type !== EXT.OPTX_LIGHT      &&
          struct.type !== EXT.OPTX_POST       &&
          struct.type !== EXT.OPTX_ENV        &&
          struct.type !== EXT.OPTX_TEXTURE    &&
          struct.type !== EXT.OPTX_COMPOSITE_TEXTURE )
        continue

      var handler = getHandler( struct.type, struct.nsUri );
      if( handler ){
        var optxObj = handler( struct, this._lib, container, scene );
        this._lib[struct.id ] = optxObj;
        this._byName[struct.name] = optxObj;
        this._objects.push( optxObj )
      }

    }





    // todo remove this later
    var lights = this._lib.lights
    // for( var i=0;i< lights.length; i++ ){
    //   scene.add( lights[i] )
    // }



    scene.lights = new optx.Lights();
    scene.lights.build(lights);
    scene.pipeline._uniforms.add(scene.postRender.uShadowKernelRotation);
    scene.pipeline._uniforms.addSubProvider(scene.lights._uniforms);


    for( var i = 0; i< structs.length ; i++ ) {
      var struct = structs[i];

      if( struct.type == EXT.OPTX_LIGHT ||
          struct.type == EXT.OPTX_POST ||
          struct.type == EXT.OPTX_ENV ||
          struct.type == EXT.OPTX_TEXTURE ||
          struct.type == EXT.OPTX_COMPOSITE_TEXTURE
          )
        continue

      var handler = getHandler( struct.type, struct.nsUri );
      if( handler ){
        var optxObj = handler( struct, this._lib, container, scene );
        this._lib[struct.id ] = optxObj;
        this._byName[struct.name] = optxObj;
        this._objects.push( optxObj )
      }

    }

    scene.bounds.fromMeshes( this._lib.meshes );

    // var dUseTBSH = new optx.Uniform.define('USE_TB_SH');
    // dUseTBSH.def();
    // scene.pipeline._uniforms.add(dUseTBSH);

    scene.add( container )

  },

  getObjectByName : function( name ){
    return this._byName[name]
  },

  getObjects : function(){
    return this._objects
  }

};

Loader.init = function( pOptx ){
  optx = pOptx;
  initHandlers();
};

module.exports = Loader;







