#!/usr/bin/env node
import meow = require('meow')
import chromeLauncher = require('chrome-launcher')
import decamelize = require('decamelize')

const cli = meow(`
	Usage
	  $ chrome-launcher [input]
	Options
  	--port: emote debugging port number to use.
  	--chrome-path: Explicit path of intended Chrome binary
  	--user-data-dir: Chrome profile path to use
		--starting-url: Starting URL to open the browser with, default is about:blank
	Chrome Flags
		Additional flags to pass to Chrome like '--headless', '--disable-gpu'
	Examples
		# Run Chrome browser with default options
	  $ chrome-launcher
	  # Run Chrome browser in headless mode
	  $ chrome-launcher --headless
	Visit website for more info, https://www.npmjs.com/package/chrome-launcher
`)
const {port, chromePath, userDataDir, startingUrl, ...flags} = cli.flags
const chromeFlags = Object.keys(flags).map(flag => `--${decamelize(flag, '-')}`)

chromeLauncher.launch({
	port,
	chromePath,
	userDataDir,
	startingUrl,
	chromeFlags
}).then(chrome => {
	const exitHandler = err => {
		chrome.kill().then(() => {
			process.exit(-1);
		});
	}

	process.on('SIGINT', exitHandler.bind(null));
	process.on('unhandledRejection', exitHandler.bind(null));
	process.on('rejectionHandled', exitHandler.bind(null));
	process.on('uncaughtException', exitHandler.bind(null));
})
