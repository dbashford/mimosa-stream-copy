"use strict";

exports.defaults = function() {
  return {
    streamCopy: {
      extensions: ["png","jpg","jpeg","gif","eot","svg","ttf","woff","otf","yaml","kml","ico","htc","txt","xml","xsd","map","md","mp4","mp3"]
    }
  };
};

exports.placeholder = function() {
  var ph = "  streamCopy: # array of extensions for files to stream copyand not process otherwise\n" +
     "    extensions: ['png','jpg','jpeg','gif','eot','svg','ttf','woff','otf','yaml','kml','ico','htc','txt','xml','xsd','map','md','mp4','mp3']\n";
  return ph;
};

exports.validate = function ( config, validators ) {
  var errors = [];
  if ( validators.ifExistsIsObject(errors, "streamCopy config", config.streamCopy ) ) {
    validators.ifExistsIsArrayOfStrings( errors, "streamCopy.extensions", config.streamCopy.vendor );
  }
  return errors;
};