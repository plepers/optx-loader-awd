var expect = require( 'expect.js' );
var fs = require( 'fs' )

var butils = require( '../utils/buffer_utils');

// debug

var optx = require( 'optx' )

var Loader = require( 'optx-loader-awd' );


describe( "load mesh", function(){

  var awdBuf;


  before(function( done ){

    fs.readFile( './test/samples/lens.awd.gz', function (err, data) {
      if (err) {
        done( err );
        return;
      }

      awdBuf = butils.toArrayBuffer( data );
      done();

    });

  });




  it( "should fullfill a standard default gl context state", function(){

    expect( Loader ).to.be.ok();

    console.log( Loader )

    Loader.init( optx )


    var view = new optx.GLView( 128, 128 );
    var scene = new optx.Scene( view );


    var l = new Loader( awdBuf );
    l.load( scene );

    //console.log( l._byName['lens body (1)'] )




  });

});


