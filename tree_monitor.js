const
      _ = require('underscore'),
  fs    = require('fs'),
  async = require('async');

var dirContent = [], dirNewContent = [], changedFiles = [], statFiles = {} ;

module.exports = function(dirPath, callback, exec_once) {

    exec_once = exec_once || "false";

    dirContent = fs.readdirSync(dirPath);

    _.each(dirContent, function(e, index, list) {
        statFiles[dirPath + '/' + e] = fs.statSync(dirPath + '/' + e)['ctime'].toString() ;
    });

    dirContent = [];

    // ---------------------------------------------------------------------------

    async.forever( function(next) {

        dirNewContent = fs.readdirSync(dirPath);

        var deletedFiles  = _.difference(dirContent, dirNewContent);
        var addedFiles    = _.difference(dirNewContent, dirContent);
        var changedFilesBuffer = _.intersection(dirNewContent, dirContent);

        changedFilesBuffer.forEach(function(e) {
            if( fs.statSync(dirPath + '/' + e)['ctime'].toString()  !=
                statFiles[ dirPath + '/' + e ]) {
                changedFiles.push(e);
                statFiles[dirPath + '/' + e] = fs.statSync(dirPath + '/' + e)['ctime'].toString() ;
            }
        });

        if ( deletedFiles.length > 0  || addedFiles.length > 0 || changedFiles.length > 0) {
            callback(dirNewContent, deletedFiles, addedFiles, changedFiles);
            changedFiles = [];
            dirContent = dirNewContent;
        };

        _.each(dirContent, function(e, index, list) {
            statFiles[dirPath + '/' + e] = fs.statSync(dirPath + '/' + e)['ctime'].toString() ;
        });

        if( exec_once == "false" ){ next(); };

    },
    function(err) {
        console.log(err);
    }
  );
}
