const collection = require( '../utilities/connection' );
let seller={}

seller.sellerLogin= async ( body )=>{
    let model= await collection.getCollection();
    let data=await model.findOne( {"sEmail": body.email, "sPassword": body.password} )
    if( data ){
       
        return data;
    } else{
       let user=await model.findOne( {"sEmail": body.email} );
       if( user ){
        let err=new Error( 'Your password is incorrect!!' );
        err.status=404;
        throw err;
       } else{
        let err=new Error( 'You are not registered! Please register to LogIn' );
        err.status=404;
        throw err;
       }
    }
}

seller.sellerRegister= async ( body )=>{
    let model=await collection.getCollection();
    let data=await model.create( {
        "sEmail": body.email,
        "sName": body.name,
        "sPassword": body.password,
        "sPhone": body.phoneNumber,
        "sAccountNumber": body.accountNumber,
        "sTan": body.tan,
        "sGSTNumber": body.gstNumber
    } )
    console.log( 'In register' );
    if( data==null ){
        let err=new Error( 'Registration Failed' );
        err.status=404;
        throw err;
    } else{
        return data;
    }
}

module.exports=seller;