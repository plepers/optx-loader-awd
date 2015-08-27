module.exports = {

  hexToRGB : function( hex ){
    return [
      ((hex>>>16)&0xFF) / 0xFF,
      ((hex>>>8 )&0xFF) / 0xFF,
      ((hex>>>0 )&0xFF) / 0xFF
    ]
  },


  setupObj3D : function( optxObj, awdObj, lib ){
    optxObj.transform.set( awdObj.matrix )
    optxObj.name = awdObj.name;

    // todo pivot?

    if( awdObj.parent ){
      var op = lib.resolve( awdObj.parent )
      op.add( optxObj )
    }
  }

}