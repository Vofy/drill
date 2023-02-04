module.exports = {
	apps: [{
		name: 'drill',
		script: 'yarn',
		args: "start",
		watch: true,
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
