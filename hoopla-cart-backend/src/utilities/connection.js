const{Schema} = require( 'mongoose' )
const mongoose = require( 'mongoose' )
mongoose.Promise = global.Promise

mongoose.set( 'useCreateIndex',true )

const url = "mongodb://localhost:27017/CartsDB"

const cartSchema = Schema(
    {
        "userId": String,
        "prodId": String,
        "prodName": String,
        "qty": Number,
        "price": Number
    }
,{collection: "Cart"} )

let connection = {}

connection.getCart = async () =>{
    try{
        //console.log("Connecting")
        return mongoose.connect( url,{useNewUrlParser: true, useUnifiedTopology: true} ).then( database =>{
            return database.model( "Cart",cartSchema )
        } )
    }
    catch( err ){
        let error = new Error( "Could not connect to mongoose" )
        error.status = 500
        throw error
    }
}
module.exports = connection