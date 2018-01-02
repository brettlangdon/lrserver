#!/usr/bin/env node
var argv = require('yargs')
    .example('$0 ./path/to/files')
    .example('$0 -w source/scss -w source/js ./public')
    .option('bind', {
      alias: 'b',
      describe: 'Host/port for static server to bind to',
      type: 'string',
      default: '127.0.0.1:3000',
    })
    .option('lrbind', {
      alias: 'l',
      describe: 'Host/port for LiveReload to bind to',
      type: 'string',
      default: '127.0.0.1:35729',
    })
    .option('watch', {
      alias: 'w',
      describe: 'Directory to watch for changes',
      type: 'array',
    })
    .command('$0', '', function (yargs) {
        yargs.positional('serve', {
          type: 'string',
          describe: 'The directory to serve static files from',
        });
    })
    .argv;

// Parse static server host/port
var host = '127.0.0.1';
var port = 3000;
if (argv.bind) {
  if (typeof argv.bind === 'number') {
    port = argv.bind;
  } else {
    var bind = argv.bind.split(':', 2);
    if (bind.length > 1) {
      host = bind[0];
      port = parseInt(bind[1]);
    } else {
      port = parseInt(bind[0]);
    }
  }
}

// Parse LiveReload server host/port
var lrhost = '127.0.0.1';
var lrport = 35729;
if (argv.lrbind) {
  if (typeof argv.lrbind === 'number') {
    lrport = argv.lrbind;
  } else {
    var lrbind = argv.lrbind.split(':', 2);
    if (lrbind.length > 1) {
      lrhost = lrbind[0];
      lrport = parseInt(lrbind[1]);
    } else {
      lrport = parseInt(lrbind[0]);
    }
  }
}

// Parse directories LiveReload should watch
var watching = argv.watch || [];
if (typeof watching === 'string') {
  watching = [watching];
}

// Parse directory to serve static files from
var serve = argv._[0] || process.cwd();
if (watching.length === 0) {
  watching.push(serve);
}

var express = require('express');
var livereload = require('livereload');

var lrserver = livereload.createServer({
  // We will start this manually later
  noListen: true,
  port: lrport,
  host: lrhost,
});

var app = express();
app.use(require('connect-livereload')());
app.use(express.static(serve));

module.exports = {
  app: app,
  lrserver: lrserver,
};

if (!module.parent) {
  app.listen(port, host, function () {
    console.log('Server listening at http://' + host + ':' + port + '/');
  });
  lrserver.listen(function () {
    console.log('LiveReload server listening at ws://' + lrhost + ':' + lrport + '/');
    watching.forEach(function (fname) {
      console.log('LiveReloading is watching ' + fname);
      lrserver.watch(fname);
    });
  });
}
