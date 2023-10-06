const { connect, connection } = require('mongoose');
// const connectionString =
//   process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';
//  Uncomment lines above after setting up in Heroku and changing DB name

connect(connectionString);

module.exports = connection;