'use strict';

var exec = require('child_process').exec;
var blessed = require('blessed');
var contrib = require('blessed-contrib');


var renderOutput = function() {

};

var debianTower = function() {

};

var windowTower = function() {

};

var renderOnCli = function(names) {
  var data = names.map(function(obj) {
    return [obj.name, obj.strength];
  });

  var screen = blessed.screen();
  var table = contrib.table({
    keys: true,
    fg: 'green',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: true,
    label: 'Active Wifi',
    width: '40%',
    height: '30%',
    border: {
      type: 'line',
      fg: 'green'
    },
    columnSpacing: 10,
    columnWidth: [50, 12]
  });

  table.focus();
  screen.append(table);

  table.setData({
    headers: ['name', 'signals'],
    data: data
  });

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  screen.render();
};


var darwinTower = function(cb) {

  var cmd = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -s';

  exec(cmd, function(error, stdout) {
    var str = stdout.split('\n');
    var names = str.map(function(node) {
      var n = node.trim().split(/((\d|([a-f]|[A-F])){2}:){5}(\d|([a-f]|[A-F])){2}/);
      var signal = parseInt(n[6], 10);

      return {
        name: n[0].trim(),
        strength: signal
      };
    }).slice(1).slice(0, -1);
    var fun = typeof cb === 'function' ? cb : renderOnCli;
    fun(names);
  });
};

module.exports = function(cb) {
  var os = process.platform;
   if (typeof cb !== 'function') {
    cb = function() {};
   }
  switch (os) {
    case 'darwin':
      return darwinTower(cb);
    default:
      return cb('opreating system not supported');
  }
};
