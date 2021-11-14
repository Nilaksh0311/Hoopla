const dbLayer = require( '../model/users' );
//const db = require('../model/dbSetup');


let seller = {}

//Verfying the credentials of user
seller.login = async ( body ) => {
  const response = await dbLayer.sellerLogin( body );
  return response;
}

seller.register = async ( body ) =>{
  const response = await dbLayer.sellerRegister( body );
  return response;
}

module.exports = seller