const dbModel = require( "../utilities/connection" );
//const allProductsData = require('')

const pastDB = {};

pastDB.insertOrders = async ( { orderArray, userEmail } ) => {
  let model = await dbModel.getPastOrdersConnection();
  const updateOrders = orderArray.map( ( order ) => {
    return{ ...order, uEmail: userEmail };
  } );
  let response = await model.insertMany( updateOrders );
  if( response && response.length > 0 ) {
    return response;
  } else{
    return false;
  }
};

pastDB.getPastOrders = async ( emailId ) => {
  let model = await dbModel.getPastOrdersConnection();
  let data = await model.find( { uEmail: emailId } ).sort( { createdAt: "desc" } );
  if( data != null ) {
    return data;
  } else{
    return null;
  }
};

module.exports = pastDB;
