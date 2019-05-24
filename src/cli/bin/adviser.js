#!/usr/bin/env node

/**
 * @fileoverview CLI that is run via the adviser command.
 *
 */

'use strict';

const fs = require('fs');

const errorHandler = require('../../core/errors/error-handler');
const cli = require('../cli');
const logger = require('../../utils/logger');

const isInitEnabled = process.argv.indexOf('--init') > -1;
const isDebugEnabled = process.argv.indexOf('--debug') > -1;

if (isDebugEnabled) {
  require('debug').enable('adviser:*');
}

process.once('uncaughtException', errorHandler.onError);

if (isInitEnabled) {
  createInitFileTemplate();
} else {
  cli.execute(process.argv, exitCode => {
    process.exitCode = exitCode;
  });
}

/**
 * Create init configuration file based on an internal template
 *
 */
function createInitFileTemplate() {
  const adviserInitConfigFileTemplate = require('../../core/config/data/init-config-file-template.json');
  fs.writeFile('.adviserrc', JSON.stringify(adviserInitConfigFileTemplate, null, 4), function(err) {
    if (err) throw err;
    logger.info('Adviser created a configuration file called .adviserrc');
  });
}