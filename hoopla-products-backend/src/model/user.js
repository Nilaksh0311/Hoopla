//const { generateId } = require('../../../hoopla-users-backend/src/model/user');
const dbModel = require( '../utilities/connection' )
const allProductsData = require( './products.json' )

const prodDB={}


prodDB.generateId = async () => {
    let model=await dbModel.getProductsCollection();
    let ids=await model.distinct( '_id' );
    let a=ids[ids.length-1]
    a=Number( a )
    return a+1;
  }

prodDB.insertAllProducts = async () => {
    let model = await dbModel.getProductsCollection();
    await model.deleteMany();
    let response = await model.insertMany( allProductsData )
    if( response && response.length > 0 ){
        return response
    } else{
        return false
    }
}

prodDB.getProducts= async ()=>{
    let model=await dbModel.getProductsCollection();
    let data=await model.find();
    if( data!=null ){
        return data;
    }
    else{ return null}
}

prodDB.getSingleProduct = async ( productId )=>{
    let model = await dbModel.getProductsCollection();
    let data = await model.findOne( { "_id": productId } )
    if( data!=null ){
        return data;
    } else{
        return null
    }
}

prodDB.deleteProduct = async ( productId )=>{
    let model=await dbModel.getProductsCollection();
    let deleted=await model.deleteOne( { "_id": productId } );
    if( deleted.deletedCount==1 ){
        return true;
    } else{ return false;}
}

prodDB.addProduct= async ( body )=>{
    let model = await dbModel.getProductsCollection();
    let pid = await prodDB.generateId();
    let add = await model.create( {
        "_id": `${pid}`,
        "pName": body.productName,
        "pDescription": body.productDesc,
        "pRating": body.rating,
        "pCategory": body.category,
        "price": body.price,
        "color": body.color,
        "image": body.imageUrl,
        "specification": "",
        "dateFirstAvailable": new Date(),
        "dateLastAvailable": "",
        "pSeller": {
          "s_Id": body.sellerId,
          "pDiscount": body.discount,
          "pQuantity": body.quantity,
          "pShippingCharges": body.shippingCharges
        }
    } )
    if( add ){ return add }
    else{ return false }
}

prodDB.orderProducts = async ( body )=>{
    let model = await dbModel.getProductsCollection();
    let result = await model.updateOne( { _id: body.productId } , { $inc: { "pSeller.$.pQuantity": -body.quantity } } );
    if( result.nModified==1 ){
        return true
    } else{ return null }
}

prodDB.changeDetails = async ( body )=>{
    let model = await dbModel.getProductsCollection();
    let result = await model.updateOne( { _id: body.productId },
        { "pSeller.pQuantity": body.quantity , "pSeller.pDiscount": body.discount/100, "price": body.price},
        {runValidators: true} );
    if( result.nModified==1 ){
        return true;
    } else{ return false }
}

prodDB.getProduct = async ( pid )=>{
    let model=await dbModel.getProductsCollection();
    let product=await model.findOne( { _id: pid } );
    if( product ){
        return product;
    } else{
        return null;
    }
}

module.exports=prodDB;