const { expect } = require('chai')
const chai = require('chai')
const chaiAsPromissed = require('chai-as-promised');
chai.use(chaiAsPromissed)
const model = require('../src/model/user')

describe('Testing suit for model file', ()=>{
    it('Tesing generate Id method', async()=>{
        const res = await model.generateId()
        expect(res).to.be.a('Number')
    })
    it('Testing for getting all products', async()=>{
        const res = await model.getProducts()
        expect(res).to.be.a('Array')
    })
    it('Testing of getting single product with correct product Id', async()=>{
        const res = await model.getSingleProduct(1010)
        expect(res).to.be.a('Object')
    })
    it('Testing of getting single product with correct product Id', async()=>{
        const res = await model.getSingleProduct(1010)
        expect(res._id).to.be.equal('1010')
    })
    it('Testing of getting single product with incorrect product Id', async()=>{
        const res = await model.getSingleProduct(4030)
        expect(res).to.be.equal(null)
    })
    
})