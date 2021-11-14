import { Product } from './dto/product';


export interface Cart {
    total: number;
    data: [{
        product: Product,
        inCart: number,
    }];
}

// export interface CartModelPublic {
//     total: number;
//     prodData:[{
//         id:number,
//         incart:number;
//     }]
// }
// export interface CartModelServer {
//     total: number;
//     data:[{
//         product: Product,
//         numInCart:number;
//     }]
// }
