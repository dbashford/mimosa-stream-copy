"use strict";

var fs = require( "fs" )
  , path = require( "path" )
  , mkdirp = require( "mkdirp" )
  , config = require( "./config" );

var _copy = function( source, target, cb ) {
  var cbCalled = false;

  function done( err ) {
    if ( !cbCalled ) {
      cb( err );
      cbCalled = true;
    }
  }

  var rd = fs.createReadStream( source );
  rd.on( "error", done );

  var wr = fs.createWriteStream( target );
  wr.on( "error", done );
  wr.on( "close", function( ex ) {
    done();
  });
  rd.pipe( wr );
};

var _process = function ( mimosaConfig, options, next ) {
  if ( options.files && options.files.length ) {
    options.files.forEach( function( file, i ) {
      var out = file.outputFileName;
      mkdirp( path.dirname( out ), function( err ) {
        if ( err ) {
          mimosaConfig.log.error( "Could not create directory, " + err );
        } else {
          var cb = function( err ) {
            if ( err ) {
              mimosaConfig.log.error( "Encountered stream error ", err, { exitIfBuild:true } );
            } else {
              mimosaConfig.log.success( "Copied file [[ " + out + " ]]" );
            }

            if ( i + 1 === options.files.length) {
              // work is done, call it a day
              next( false );
            }
          };
          _copy( file.inputFileName, out, cb );
        }
      });
    });
  } else {
    next();
  }
};

var registration = function ( mimosaConfig, register ) {
  register( [ "buildFile", "add", "update"], "beforeRead", _process, mimosaConfig.streamCopy.extensions );
};

module.exports = {
  registration: registration,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};