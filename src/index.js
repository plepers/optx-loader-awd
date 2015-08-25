awdLib        = require( 'awdlib/lib/awdlib_readonly' );
awdLib_optx   = require( 'awdlib/lib/awdlib_optx_readonly' )(awdLib);

var optx;

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

  this._elements = {}
}

Loader.prototype =
{
  load : function(){
    this.awd = new awdLib.awd();
    this.awd.addExtension( awdLib_optx.ext.getExtension() );

    console.log( this.buffer.byteLength )

    this.awd.parse( this.buffer );
    console.log( this.buffer.byteLength )

    var structs = this.awd._elements;

    for( var i = 0; i< structs.length ; i++ ) {
      var struct = structs[i];
      console.log( struct.name )
    }

  }
};

Loader.init = function( pOptx ){
  optx = pOptx;
};

module.exports = Loader;







