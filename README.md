# Tree Monitor

Simple node script to monitor directory.


```javascript
const
    dirWatchList = require('./dir_watch');

dirWatchList('./sync', function(dirContent, deleted, added) {
   console.log('Deleted files: ' + deleted + '\nAdded Files: ' + added);
})
```
