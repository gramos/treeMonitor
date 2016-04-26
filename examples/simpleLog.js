const
    treeMonitor = require('../tree_monitor');

treeMonitor('../test/sync', function(dirContent, deleted, added, changed) {
    console.log('Deleted files: ' + deleted + '\nAdded Files: '
                + added + '\nChanged Files: ' + changed);
})
