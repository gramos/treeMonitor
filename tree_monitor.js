const
      _ = require('underscore'),
  fs    = require('fs'),
  async = require('async');

var dirContent = [], dirNewContent = [], changedFiles = [], statFiles = {} ;

function getChangedFiles(dirPath, changedFilesBuffer, statFiles, changedFiles) {
    changedFilesBuffer.forEach( function(e) {
        if( fs.statSync(dirPath + '/' + e)['ctime'].toString()  !=
            statFiles[ dirPath + '/' + e ] ) {

            changedFiles.push(e);
            statFiles[dirPath + '/' + e] = fs.statSync(dirPath + '/' + e)['ctime'].
                toString() ;
        }
    });
};

function getStatFiles(dirPath, statFiles, dirContent) {
    _.each(dirContent, function(e, index, list) {
        statFiles[dirPath + '/' + e] = fs.statSync(dirPath + '/' + e)['ctime'].toString() ;
    });
};

module.exports = function(dirPath, callback, exec_once) {

    exec_once  = exec_once || "false";
    dirContent = fs.readdirSync(dirPath);

    getStatFiles(dirPath, statFiles, dirContent);
    dirContent = [];

    // ---------------------------------------------------------------------------

    async.forever( function(next) {
        dirNewContent = fs.readdirSync(dirPath);

        var deletedFiles       = _.difference(dirContent, dirNewContent);
        var addedFiles         = _.difference(dirNewContent, dirContent);
        var changedFilesBuffer = _.intersection(dirNewContent, dirContent);

        getChangedFiles( dirPath, changedFilesBuffer, statFiles, changedFiles );

        if ( deletedFiles.length > 0  || addedFiles.length > 0 || changedFiles.length > 0) {
            callback(dirNewContent, deletedFiles, addedFiles, changedFiles);
            changedFiles = [];
            dirContent = dirNewContent;
        };

        getStatFiles(dirPath, statFiles, dirContent);

        if( exec_once == "false" ){ next(); };

    },
    function(err) {
        console.log(err);
    }
  );
}
