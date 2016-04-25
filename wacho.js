const
   fs         = require('fs'),
   origin     = './sync',
   target     = './sync-target'
   async      = require('async'),
   file       = require('file'),
   path       = require('path');

work = async.queue(function(filePath, done) {

    fs.watch(filePath, function() {
        console.log("> File " + filePath + " just changed!");
        var origFile   = fs.createReadStream(filePath);
        var targetFile = fs.createWriteStream( target + "/" + path.basename(filePath) );
        origFile.pipe(targetFile);
    });

}, 1000);

console.log('==> beginning directory walk');
file.walk(origin, function(err, dirPath, dirs, files){
    files.forEach(function(filePath){
        work.push(filePath);
    });
});


