module.exports = {
	port: 8888,
	session: {
		secret: 'task-system',
		key: 'task-system',
		maxAge: 24 * 60 * 60 * 1000
	},
	mongodb: 'mongodb://localhost:27017/taskDB'
};