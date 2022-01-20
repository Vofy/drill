module.exports = {
	apps: [{
		name: 'perfektnidrill',
		script: 'yarn',
		args: "start",
		watch: 'build',
		env_development: {
			NODE_ENV: 'development',
			PORT: 50004
		},
		env_production: {
			NODE_ENV: 'production',
			PORT: 50004
		},
	}],
};
