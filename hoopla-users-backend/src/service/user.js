const dbLayer = require( '../model/user' );
const db = require( '../model/dbSetup' );
const{ response } = require( 'express' );

let user = {}

//Verfying the credentials of user
user.loginUser = ( uEmail, pass ) => {
  return dbLayer.userLogin( uEmail, pass ).then( response => {
    return response
  } )
}

user.register = ( body ) =>{
  console.log("User.register " + JSON.stringify(body))
  return dbLayer.register( body ).then( response=>{
    return response
  } )
}

module.exports = user