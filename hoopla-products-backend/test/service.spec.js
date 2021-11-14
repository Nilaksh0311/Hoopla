const { expect } = require('chai')
const chai = require('chai')
const chaiAsPromissed = require('chai-as-promised');
chai.use(chaiAsPromissed)
const service = require('../src/service/user')

describe('Testing suit for service file', ()=> {
    
    it('Testing for inserting correct data', async()=>{
        const data = {
            "productName": "Asus Zenfone Max Pro M2",
            "productDescr": "an economical phone by Asus",
            "rating": 3.5,
            "category": "Electronics",
            "price": 14999,
            "color": "Black",
            "imageUrl": "Zenfone Max Pro M2.png",
            "specification": "",
            "sellerId": "Asus@Seller",
            "discount": 0.2,
            "quantity": 661,
            "shippingCharges": 150
        }
        const res = await service.addProduct(data)
        expect(res).to.be.a('Object')
    })
    it('Testing for inserting correct data', async()=>{
        const data = {
            "productName": "Poco M2 Pro",
            "productDescr": "an economical phone by Poco",
            "rating": 4.5,
            "category": "Electronics",
            "price": 14999,
            "color": "Black",
            "imageUrl": "",
            "specification": "",
            "sellerId": "Poco@Seller",
            "discount": 0.2,
            "quantity": 661,
            "shippingCharges": 150
        }
        const res = await service.addProduct(data)
        expect(res).to.be.a('Object')
    })
    it('Testeing for update of product', async()=>{
        const data = {
            "productId": "1012",
            "quantity": 1,
            "discount": 0.6,
            "price": 30000
        }
        const res = await service.changeDetails(data)
        expect(res).to.be.equal(true)
    })
    it('Testeing for update of product', async()=>{
        const data = {
            "productId": "1003",
            "quantity": 1,
            "discount": 0.6,
            "price": 30000
        }
        const res = await service.changeDetails(data)
        expect(res).to.be.a('Boolean')
    })
    it('Testing for deleting product', async() => {
        const prodId = '1003'
        const res = await service.deleteProduct(prodId)
        expect(res).to.be.a('Boolean')
    })
})