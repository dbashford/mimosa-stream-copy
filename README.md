mimosa-stream-copy
===========

## Overview

This is a streaming copy module for the Mimosa build tool. It handles copying for files that do not need any other processing by mimosa modules during `watch` or `build`.  The [mimosa-copy](https://github.com/dbashford/mimosa-copy) module will copy files as well, but it does not stream them. Files processed by that module are read into memory and written out of memory.

For more information regarding Mimosa, see http://mimosa.io

## Usage

Add `'stream-copy'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

This module will copy all files that match the `extensions` array from the `watch.sourceDir` to the `watch.compiledDir` using streams. Once the file is copied, this module calls `next(false)` which stops any further processing for the file.

Do not use this module on any files that you need to have processed by other Mimosa modules.  For instance, do not use this on CoffeeScript files that need to be compiled, or CSS files if you wish to have them [CSSLinted](https://github.com/dbashford/mimosa-csslint).

## Default Config

```javascript
streamCopy: {
  extensions: ["png","jpg","jpeg","gif","eot","svg","ttf","woff","otf","yaml","kml","ico","htc","txt","xml","xsd","map","md","mp4","mp3"]
}
```

* `extensions`: The extensions to be stream copied. Files possessing these extensions will be copied from the `watch.sourceDir` to `watch.compiledDir` and then processing for the files will stop. If any other modules expect to process these files during `watch` or `build` they will be unable to, so be sure to only include those files that do not need other processing.