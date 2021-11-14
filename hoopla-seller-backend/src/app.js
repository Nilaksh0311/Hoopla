const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const create = require( './model/dbSetup' );

const route = require( './routes/routing' )
const requestLogger = require( './utilities/requestlogger' )
const errorLogger = require( './utilities/errorlogger' )

app.use( cors() );
app.use( bodyParser.json() );
app.use( requestLogger )
app.use( '/seller', route )
app.use( errorLogger )

app.get( "/seller/setupDB", ( req, res, next ) => {
    create.setupDB().then( response => {
      if( response ) res.json( { message: "Successfully inserted " + response + " documents into database" } )
    } ).catch( error => {
      next( error );
    } )
  } );

app.listen( 2020, ()=>{
    console.log( 'Products service running at port 2020' )
} );

module.exports=app;