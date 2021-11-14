const express = require( 'express' )
const app = express()
const bodyParser = require( 'body-parser' )
const cors = require( 'cors' )

const route = require( './routes/routing' )
const requestLogger = require( './utilities/requestlogger' )
const errorLogger = require( './utilities/errorlogger' )

app.use( cors() )
app.use( bodyParser.json() )
app.use( requestLogger )
app.use( '/',route )
app.use( errorLogger )

app.listen( 2001, ()=>{
    console.log( "Cart service running at port 2001" )
} )

module.exports = app;