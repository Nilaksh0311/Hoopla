const collection = require( '../utilities/connection' );
let user = {}

//Verify the user credentials and modify the last logout
user.userLogin = async ( uEmail, uPass ) => {
  const userColl = await collection.getCollection();
  const data = await userColl.find( { "uCredentials.uEmail": uEmail } );
  if( data.length === 1 ) {
    if( uPass == data[0]['uCredentials']['uPass'] ) {
      return userColl.updateOne( { "uCredentials.uEmail": uEmail },
        { $set: { "uProfile.uLastLogin": new Date().toISOString() } } ).then( res => {
          if( res.nModified === 1 ) {
            return data;
          }
        } );
    } else{
      let err = new Error( "The password entered is incorrect!!" );
      err.status = 401;
      throw err;
    }
  } else{
    let err = new Error( "You are not registered.Please register to login" );
    err.status = 404;
    throw err;
  }
}

user.generateId=async ()=>{
  let model=await collection.getCollection();
  let ids=await model.distinct( 'userId' );
  let a=ids[ids.length-1].substr( 1,4 )
 // a=Math.floor(1000 + Math.random() * 9000);
  a=Number( a )
  return"U"+( a+1 );
}

user.register= async ( body )=>{
  const userColl = await collection.getCollection();
  const userId= await user.generateId();
  const id=JSON.stringify(userId)
  console.log("inside model of user",JSON.stringify(body))
 
  let registerUser=await userColl.create( {
    "userId": id,
    "uCredentials": {
      "uEmail": body.email,
      "uPass": body.password
    },
    "uProfile": {
      "uName": body.name,
      "uDOB": body.dateOfBirth,
      "uPhone": body.phoneNo,
      "uIsSeller": false,
      "uDateJoined": new Date(),
      "uLastLogin": new Date()
    }
  } )
  if( registerUser==null )
  {
    let err = new Error( "Registration is failed" );
    err.status = 401;
    throw err;
  }
  else{
    return registerUser
  }
}

//user.register({"name":"nilaksh0311@gmail.com","email":"nilaksh0311@gmail.com","password":"Nilaksh0311@gmail.com","dateOfBirth":"2021-11-01","phoneNo":1234567890})
module.exports = user