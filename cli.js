#!/usr/bin/env node

'use strict';

var wifiHeat = require('./');

wifiHeat(function(err) {
  if (err) {
    console.log(err);
  }
});
