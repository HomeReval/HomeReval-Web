import pako from 'pako'

export function decompress( gzip ){

  let compressData = atob( gzip );
  compressData = compressData.split( '' ).map( function( e ) {
      return e.charCodeAt( 0 );
  });

  // Turn number array into byte-array
  let binData = new Uint32Array( compressData );
  let data = pako.inflate( binData );

  // Convert gunzipped byteArray back to ascii string:
  let strData = new TextDecoder('utf-8').decode( data );   //String.fromCharCode.apply( null, new Uint32Array( data ) );

  return strData
}
