const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const errorHandler = require('errorhandler');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const config = require('./environment');

module.exports = function configExpress(app) {
  app.set('env', config.env);
  app.set('port', config.port);
  app.set('ip', config.ip);

  if (app.get('env') === 'development') {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.set('clientPath', path.join(config.root, 'client'));
  } else {
    app.set('clientPath', path.join(config.root, 'public'));
  }
  app.use(express.static(app.get('clientPath')));

  if (app.get('env') !== 'test') {
    app.use(morgan('dev'));
  }

  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (app.get('env') === 'development') {
    app.use(errorHandler());
  }
};
