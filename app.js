var express = require('express');
var cs= require('coffee-script');
require('coffee-script/register');
var app = express();

var fs = require('fs');
var path = require('path');

var handlerPath = path.join(path.dirname(__filename), 'handler');
var files = fs.readdirSync(handlerPath);

process.chdir(__dirname);

files.forEach(function (filepath) {
  var handlerName = path.basename(filepath, path.extname(filepath));
  var handler = require(path.join(handlerPath, filepath));
  console.log("New handler: " + handlerName);
  var regEx = new RegExp('^\/' + handlerName + '(\.djs){0,1}(\/.*)*$');
  app.get(regEx, handler);

  if (handlerName === 'index') {
    app.get('/', handler);
  }
});


var port = process.env.PORT || 3000;
console.log("Port: " + port);
app.listen(process.env.PORT || 3000);
