const{ Schema } = require( 'mongoose' );
const mongoose = require( 'mongoose' );
mongoose.Promise = global.Promise;

mongoose.set( 'useCreateIndex', true );

const url = "mongodb://localhost:27017/UsersDB"
  
const usersSchema = Schema( {
  userId: { type: String, required: [true, 'userId is required'] },
  uCredentials: {
    uEmail: { type: String, required: [true, 'uMail is required'] },
    uPass: { type: String, required: [true, 'uPass is required'] }
  },
  uProfile: {
    uName: { type: String, required: [true, 'uName is required'] },
    uDOB: { type: Date, required: [true, 'uDOB is required'] },
    uPhone: { type: Number, required: [true, 'uPhone is required'] },
    uIsSeller: { type: Boolean, default: false },
    uDateJoined: { type: Date, default: new Date().toISOString() },
    uLastLogin: { type: Date, default: new Date().toISOString() }
  }
}, { collection: "Users", timestamps: true } )

let connection = {}

//Returns model object of "Users" collection
connection.getCollection = () => {
  //Establish connection and return model as promise
  console.log("getting connection")
  return mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true } ).then( database => {
    return database.model( 'Users', usersSchema )
  } ).catch( error => {
    console.log(JSON.stringify(error));
    let err = new Error( "Could not connect to the database" );
    err.status = 500;
    throw err;
  } );
}

//console.log(connection.getCollection());

module.exports = connection;