const config = {};

config.database = {
  host: 'mongodb://192.168.99.100',
  dbName: 'test',
  port: '27018',
  user: 'root',
  password: 'example',
}

/*
config.database = {
  host: 'mongodb://localhost',
  dbName: 'test',
  port: '27017',
  user: '',
  password: '',
}
*/
module.exports = config;