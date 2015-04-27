'use strict';

var childProcess = require("child_process");

var showWIFITower = function(cb) {
  var os = process.platform;

  switch (os) {
    case 'darwin':
      return darwinTower(cb);
    default:
      return cb("not support opreating system");
  }
}

var renderOutput = function() {

}

var darwinTower = function() {

}

var debianTower = function() {

}

var windowTower = function() {

}



module.exports = showWIFI
