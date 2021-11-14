const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');



describe('Test suits for routing file', ()=> {

    it('Testing for setting up the database', async () => {
        const res = await request(app).get('/products/setupdb')
        expect(res.statusCode).to.be.equal(200)
    })

    it('Testing for getting product id', async()=> {
        const res = await request(app).get('/products/product/1001')
        expect(res.body._id).to.be.equal('1001')
    })
    it('Testing for adding the product', async()=>{
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
        const res = await request(app).post('/products/add').send(data)
        expect(res.body.message).to.be.equal('Product inserted suceesfully');
    })
    it('Testing for update product', async()=>{
        const data = {
            "productId": "1002",
            "quantity": 1,
            "discount": 0.6,
            "price": 30000
        }
        const res = await request(app).post('/products/update').send(data)
        expect(res.body.message).to.be.equal('Data updated successfully');
    })
    it('Testing for deleting product', async()=>{
        const res = await request(app).delete('/products/delete/1010')
        expect(res.status).to.be.equal(200)
    })

    it('testing for order products', async()=>{
        const obj= [
            {"productId":"1010",
            "quantity": 1}
        ]
        const res= await request(app).post('/orderProducts').send(obj);
        expect(await res.message).to.be.a("undefined");
    })
})

// describe('Test suit')   