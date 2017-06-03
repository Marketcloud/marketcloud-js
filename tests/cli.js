#!/usr/bin/env node

var spawn = require('child_process').spawn

var child = spawn('mocha-phantomjs', [
  '-p', 'phantomjs-2.1.1-linux-x86_64/bin/phantomjs',
  '--timeout', '25000',
  'http://localhost:9000/tests/runner.html',
  '--hooks', './tests/phantomjs_hooks.js'
])

child.stdout.on('data', function (data) {
  console.log('stdout: ' + data)
    // Here is where the output goes
})
child.stderr.on('data', function (data) {
  console.log('stderr: ' + data)
    // Here is where the error output goes
})

child.on('close', function (code) {
  console.log('Mocha process exited with code ' + code)
  if (code > 0) {
    process.exit(1)
  }
})
