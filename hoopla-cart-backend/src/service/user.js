const db = require( "../model/user" );

let cartService = {};

var userID;


cartService.getAllProducts = async ( userId ) => {
  userID = userId;
  let getCartProducts = await db.fetchProducts( userID );
  //console.log(getCartProducts)
  return getCartProducts;
};

cartService.addProductToCart = async ( body ) => {
  //console.log("Body in service",body)
  let getDetails = await cartService.getAllProducts( body.userId );
  if( getDetails == null ) {
    let addProduct = await db.addProduct( body );
    return addProduct
  } else{
    let prodIdArray = [];
    for( let i = 0; i < getDetails.length; i++ ) {
      prodIdArray.push( getDetails[i].prodId );
    }

    if( prodIdArray.includes( body.prodId ) ) {
      let prodIndex = prodIdArray.indexOf( body.prodId );
      let updateDetails = await db.updateQuantity( body );
      if( updateDetails ) {
        //console.log(getDetails)
        return updateDetails;
      } else{
        let err = new Error( "Can't update" );
        err.status = 404;
        throw err;
      }
    } else{
      let insertData = await db.addProduct( body );

      if( insertData ) {
        return insertData;
      } else{
        let err = new Error( "Can't insert" );
        err.status = 404;
        throw err;
      }
    }
  }
};

cartService.deleteProductFromCart = async ( body ) => {
  let deleteProductFromCart = await db.deleteProduct( body );
  return await cartService.getAllProducts( body.userId );
};

cartService.deleteCart = async ( userId ) => {
  let deleteProductFromCart = await db.deleteCart( userId );
  return null;
};

cartService.refreshCart = async ( body ) => {
  let deleteDetails = await db.deleteCart( body );
  for( let i = 0; i < body.length; i++ ) {
    let insertDetails = cartService.addProductToCart( body[i] );
  }
};

/*cartService.refreshCart([{
    "userId":"U101",
    "prodId":"P1003",
    "qty":1
},
{
    "userId":"U101",
    "prodId":"P1002",
    "qty":5
}]
)*/
/*
cartService.addProductToCart(
    {
        "userId":"U101",
        "prodId":"P1006",
        "qty":7
    }
)*/

cartService.getAllProducts()
module.exports = cartService;
