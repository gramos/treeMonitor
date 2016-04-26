const
   assert      = require('assert'),
   treeMonitor = require('../tree_monitor'),
   fs          = require('fs');


function test(name, cb){
    cb();
    console.log("\033[0;32m.");
};

function deleteAll() {
    files = fs.readdirSync('./sync');

    files.splice( files.indexOf('.gitignore'), 1 );

    files.forEach(function(filename) {
        fs.unlinkSync('./sync/' + filename);
    });
};

test('First time all existing files are added', function() {
    deleteAll();

    fs.writeFile("./sync/file1.txt", "Hey there!", function(err) {});
    fs.writeFile("./sync/file2.txt", "Hey there!", function(err) {});

    var dirContent, deletedFiles, addedFiles, changedFiles;

    treeMonitor('./sync', function(_dirContent, _deleted, _added, _changed) {
        dirContent      = _dirContent;
        addedFiles      = _added;
        deletedFiles    = _deleted;
        changedFiles    = _changed;
    }, "true");

    assert.equal( addedFiles.length, 3 );
    assert.deepEqual( dirContent, ['.gitignore', 'file1.txt', 'file2.txt'] );
    assert.equal( deletedFiles.length, 0 );
    assert.equal( changedFiles.length, 0 );
 });
