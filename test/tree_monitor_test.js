const
   assert      = require('assert'),
   treeMonitor = require('../tree_monitor'),
   fs          = require('fs');

fs.writeFile("./sync/file1.txt", "Hey there!", function(err) {});
fs.writeFile("./sync/file2.txt", "Hey there!", function(err) {});

var dirContent, deleted, added, changed;

treeMonitor('./sync', function(_dirContent, _deleted, _added, _changed) {
    dirContent = _dirContent;
}, "true")

assert.deepEqual( dirContent, ['file1.txt', 'file2.txt'] );

