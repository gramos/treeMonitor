const
      _ = require('underscore'),
  fs    = require('fs'),
  async = require('async');

var dirContent = [], dirNewContent = [] ;

module.exports = function(dirPath, callback) {
    async.forever( function(next) {
        dirNewContent = fs.readdirSync(dirPath);

        var deletedFiles  = _.difference(dirContent, dirNewContent);
        var addedFiles    = _.difference(dirNewContent, dirContent);

        if ( deletedFiles.length > 0  || addedFiles.length > 0 ) {
            callback(dirNewContent, deletedFiles, addedFiles);
            dirContent = dirNewContent;
        };
        next();

    },
    function(err) {
        console.log(err);
    }
  );
}
