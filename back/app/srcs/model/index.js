const mongoose=require("mongoose");
const config = require('../config')

const db = config.database;
try{

	mongoose.connect(db.host + ':' + db.port,
    {
      useNewUrlParser: true,
      user: db.user,
      pass: db.password,
      dbName: db.dbName,
    });
    
}catch(err){
	console.log(err)
}

exports.mongoose=mongoose;
// exports.db=db;

