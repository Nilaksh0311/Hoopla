const dbModel = require( "../utilities/connection" );

const cartDB = {};

cartDB.fetchProducts = async ( userId ) => {
  let model = await dbModel.getCart();

  let data = await model.find( { userId: userId } );

  if( data.length == 0 ) {
    //console.log("No data found");
    return[];
  } else{
    //console.log("data found")
    return data;
  }
};

cartDB.addProduct = async ( body ) => {
  let model = await dbModel.getCart();
  initial_product_price = body.price / body.qty;
  //console.log(initial_product_price)
  let add = await model.create( {
    userId: body.userId,
    prodId: body.prodId,
    prodName: body.prodName,
    qty: body.qty,
    price: body.price,
  } );
  if( add ) {
    //console.log("Product added", add);
    return add;
  } else{
    return false;
  }
};

cartDB.updateQuantity = async ( body ) => {
  //console.log(await body.value)
  let model = await dbModel.getCart();
  let inc = body.price / body.qty;
  //console.log("The price to add",price_to_be_inc)
  let updatedResult = await model.updateOne(
    { prodId: body.prodId, userId: body.userId },
    { $inc: { qty: 1 } }
  );
 // console.log("The price inc is", inc);

  let updatedPrice = await model.updateOne(
    { prodId: body.prodId, userId: body.userId },
    { $inc: { price: inc } }
  );
  if( updatedResult.nModified == 1 ) {
    return true;
  } else{
    return true;
  }
};

cartDB.deleteProduct = async ( body ) => {
  let model = await dbModel.getCart();
  let deleteProduct = await model.deleteOne( {
    userId: body.userId,
    prodId: body.prodId,
  } );
  return deleteProduct;
};

cartDB.deleteCart = async ( userId ) => {
  let model = await dbModel.getCart();
  let deletedResult = await model.deleteMany( { userId } );
  //console.log("DELETE SUCCESSFULLY, no of deletion: ", deletedResult);
  return deletedResult;
};

/*cartDB.deleteCart([{
    userId:"U101",
    prodId:"P1004",
    qty:10
}]);*/

/*cartDB.delete = async(body) => {
    let model = await dbModel.getCart();
    let deleteMany = await model.deleteMany()
    console.log(deleteMany)
}*/

//cartDB.fetchProducts()
//cartDB.delete()

/*cartDB.updateQuantity(
    {
        userId:"U101",
        prodId:"P1004",
        qty:1,
        price:1000
    }
)*/

//cartDB.fetchProducts("U102")

module.exports = cartDB;
