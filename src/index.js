"use strict";

var fs = require( "fs" )
  , path = require( "path" )
  , mkdirp = require( "mkdirp" )
  , config = require( "./config" );

var _process = function ( mimosaConfig, options, next ) {
  if ( options.files && options.files.length ) {
    options.files.forEach( function( file, i ) {
      var out = file.outputFileName;
      mkdirp( path.dirname( out ), function( err ) {
        if ( err ) {
          mimosaConfig.log.error( "Could not create directory, " + err );
        } else {
          fs.createReadStream( file.inputFileName ).pipe( fs.createWriteStream( out ) );
          mimosaConfig.log.success( "Copied file [[ " + out + " ]]" );
        }
        if ( i + 1 === options.files.length) {
          // work is done, call it a day
          next( false );
        }
      });
    });
  } else {
    next();
  }
};

var registration = function ( mimosaConfig, register ) {
  register( [ "buildFile", "add", "update"], "init", _process, mimosaConfig.streamCopy.extensions );
};

module.exports = {
  registration: registration,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};