const
      _ = require('underscore'),
  fs    = require('fs'),
  async = require('async');

var dirContent = [], dirNewContent = [], changedFiles = [], statFiles = {} ;

module.exports = function(dirPath, callback) {
    async.forever( function(next) {

        _.each(dirContent, function(e, index, list) {
            statFiles[dirPath + '/' + e] = fs.statSync(dirPath + '/' + e)['ctime'].toString() ;
        });

        dirNewContent = fs.readdirSync(dirPath);

        var deletedFiles  = _.difference(dirContent, dirNewContent);
        var addedFiles    = _.difference(dirNewContent, dirContent);
        var changedFilesBuffer = _.intersection(dirNewContent, dirContent);

        changedFilesBuffer.forEach(function(e) {
            if( fs.statSync(dirPath + '/' + e)['ctime'].toString()  !=
                statFiles[ dirPath + '/' + e ]) {
                console.log(e);
                changedFiles.push(e);
            }
        });

        //console.log(changedFiles);

        if ( deletedFiles.length > 0  || addedFiles.length > 0 || changedFiles.length > 0) {
            callback(dirNewContent, deletedFiles, addedFiles, changedFiles);
            

            dirContent = dirNewContent;
        };

        next();

    },
    function(err) {
        console.log(err);
    }
  );
}
