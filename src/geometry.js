module.exports = function( optx, awdlib ){



  return function handleStruct( awdObj, lib, scene ){

    var gl = scene.gl;


    var geom = new optx.Geometry( );

    geom.name = awdObj.name;

    var buffers = awdObj.vertexBuffers

    //
    // Vertex Buffers
    //
    for( var i = 0; i < buffers.length; i++ ){

      var vbuffer = buffers[i];
      var oVBuffer = new optx.VertexBuffer()
      //
      // Attribs
      //
      for( var j = 0; j < vbuffer.attributes.length; j++ ){

        var attrib = vbuffer.attributes[j]
        var oAttrib = new optx.VertexAttribute(
          attrib.name,
          attrib.numElems,
          attrib.glType,
          attrib.getFlag( awdlib.Geometry.VertexAttibute.FLAG_NORMALIZED )
        )

        oVBuffer.addAttribute( oAttrib );
      }

      oVBuffer.setData(vbuffer.data);
      oVBuffer.allocate(gl);

      geom.addVertexBuffer( oVBuffer );

    }

    //
    // Index Buffers
    //

    var buffers = awdObj.indexBuffers

    for( var i = 0; i < buffers.length; i++ ){

      var ibuffer = buffers[i];
      var oIBuffer = new optx.IndexBuffer( ibuffer.glType )
      oIBuffer.setData( ibuffer.data );
      oIBuffer.allocate( gl )

      switch( ibuffer.usage ){
        case awdlib.Geometry.IndexBuffer.TRIANGLE_USAGE:
          geom.indexBuffer = oIBuffer;
          break;
        case awdlib.Geometry.IndexBuffer.WIREFRAME_USAGE:
          geom.wireBuffer = oIBuffer;
          break;
        default :
          throw new Error( 'awd Geometry parsing error : unknown indexBuffer usage'+ ibuffer.usage )
      }

    }

    // todo handle this
    geom.bounds = {
      min: optx.Vect.create(-10, -10, -10, 1),
      max: optx.Vect.create(10, 10, 10, 1)
    }
    return geom;
  }

}