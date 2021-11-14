const db=require( '../model/user' );

let productService={}

productService.insertAllProducts = async () =>{
    let data = await db.insertAllProducts()
    if( data ){
        return data;
    } else{
        let err = new Error( 'Unable to insert all products' )
        err.status = 400;
        throw err;
    }
}

productService.getProducts= async ()=>{
    let data=await db.getProducts();
    if( data!=null ){
        return data;
    } else{
        let err=new Error( "Can't fetch products now!! Try after some time" );
        err.status=404;
        throw err;
    }
}

productService.getSingleProduct = async ( productId )=>{
    let data = await db.getSingleProduct( productId );
    if( data!=null ){
        return data;
    } else{
        let err = new Error( "Can't fetch the product" )
        err.status=404;
        throw err;
    }
}

productService.deleteProduct= async ( productId )=>{
    let deleted=await db.deleteProduct( productId );
    if( deleted ){
        return true;
    } else{
        let err=new Error( "Deletion failed!!" );
        err.status=404;
        throw err;
    }
}


productService.addProduct=async ( body )=>{
    let added=await db.addProduct( body );
    if( added ){return added}
    else{
        let err=new Error( "Adding product failed" );
        err.status=404;
        throw err;
    }
}

productService.orderProducts= async ( productsObj )=>{
    for( let obj of productsObj ){
        let product=await db.getProduct( obj.productId );
        if( Number( product.pSeller.pQuantity )==0 ){
            let err=new Error( "The product you are looking is out of stock" );
                err.status=500;
                throw err;
        }
        else if( Number( product.pSeller.pQuantity )>=obj.quantity ){
            let order=db.orderProducts( obj )
            if( order==true ){
                return true;
            }
            else{
                let err=new Error( "Order failed! Please try again" );
                err.status=404;
                throw err;
            }
        } else{
            let err=new Error( "Order quantity is greater than available quantity" );
            err.status=404;
            throw err;
        }
    }

}

productService.changeDetails= async ( body )=>{
    let change = await db.changeDetails( body );
    if( !change ){
        let err=new Error( "Sry changes are not reflected! Please check your product id!" );
            err.status=404;
            throw err;
    } else{
        return true;
    }
}

module.exports = productService;