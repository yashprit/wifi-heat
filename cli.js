#!/usr/bin/env node

'use strict';
var argv = require('minimist')(process.argv.slice(2));
var wifiHeat = require('./');

wifiHeat();
