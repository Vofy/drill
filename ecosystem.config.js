module.exports = {
	apps: [{
		name: 'perfektnidrill',
		script: 'npm',
		args: 'start',
		watch: 'src',
		env: {
			NODE_ENV: 'development',
			PORT: 50004
		},
		env_production: {
			NODE_ENV: 'production',
			POERT: 50004
		},
	}],
};
