const
   assert      = require('assert'),
   treeMonitor = require('../tree_monitor'),
   fs          = require('fs');


function test(name, cb){
    cb();
    console.log("\033[0;32m.");
}

test('First time all existing files are added', function() {
    fs.writeFile("./sync/file1.txt", "Hey there!", function(err) {});
    fs.writeFile("./sync/file2.txt", "Hey there!", function(err) {});

    var dirContent, deleted, added, changed;

    treeMonitor('./sync', function(_dirContent, _deleted, _added, _changed) {
        dirContent = _dirContent;
    }, "true")

    assert.deepEqual( dirContent, ['.gitignore', 'file1.txt', 'file2.txt'] );
});
