const express = require( "express" );
const routing = express.Router();
const service = require( "../service/user" );
var userId = "";

//To verify the credentials of user
routing.post( "/login", ( req, res, next ) => {
  let uEmail = req.body.email;
  let uPass = req.body.password;
  return service
    .loginUser( uEmail, uPass )
    .then( ( item ) => {
      // console.log(item[0].userId)
      userId = item[0].userId;
      // console.log(userId)
      res.json( { data: item } );
    } )
    .catch( ( err ) => {
      next( err );
    } );
} );

routing.post( "/register", ( req, res, next ) => {
  console.log("Request come in routing")
  return service
    .register( req.body )
    .then( ( item ) => {
      res.json( { data: item } );
    } )
    .catch( ( err ) => {
      next( err );
    } );
} );

routing.get( "/getUserID", ( req, res, next ) => {
  // console.log('in userid', userId)
  res.json( { userId: userId } );
} );

module.exports = routing;
