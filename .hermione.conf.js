module.exports = {
	baseUrl: 'http://localhost:4000',
	screenshotsDir: 'tests/screens',
	sets: {
		desktop: {
			files: 'tests/desktop'
		}
	},
	browsers: {
		chrome: {
			desiredCapabilities: {
				browserName: 'chrome',
				chromeOptions: {
					// args: ['--headless', '--window-size=1366,768'],
					args: ['--window-size=1366,768'],
				  },
			},
		}
	},
	// plugins: {
	// 	'html-reporter/hermione': {
	// 	  enabled: true,
	// 	  path: 'tests/hermione-reports',
	// 	  defaultView: 'all',
	// 	  baseHost: 'http://localhost:4000',
	// 	},
	//   },
};
