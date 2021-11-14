const{ Schema } = require( 'mongoose' );
const mongoose = require( 'mongoose' );
mongoose.Promise = global.Promise;

mongoose.set( 'useCreateIndex', true );

const url = "mongodb://localhost:27017/UsersDB"

const sellerSchema= Schema( {
    sEmail: {type: String},
    sName: {type: String},
    sPassword: {type: String},
    sPhone: {type: Number},
    sAccountNumber: {type: Number},
    sTan: {type: String},
    sGSTNumber: {type: String}
},{ collection: "Sellers", timestamps: true } )

let connection={}

connection.getCollection=()=>{
    return mongoose.connect( url,{ useNewUrlParser: true, useUnifiedTopology: true } ).then(
        database => {
            return database.model( 'Sellers', sellerSchema )
          }
    ).catch(
        error => {
            let err = new Error( "Could not connect to the database" );
            err.status = 500;
            throw err;
          }
    );
}

module.exports=connection;