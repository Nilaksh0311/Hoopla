const express = require( "express" );
const app = express();
const bodyParser = require( "body-parser" );
const cors = require( "cors" );

const route = require( "./routes/routing" );
const requestLogger = require( "./utilities/requestlogger" );
const errorLogger = require( "./utilities/errorlogger" );

app.use( cors() );
app.use( bodyParser.json() );
app.use( requestLogger );
app.use( "/orders", route );
app.use( errorLogger );

app.listen( 1000, () => {
  console.log( "Products service running at port 1000" );
} );

module.exports = app;
