let { expect, assert } = require("chai");
const service = require("../src/service/pastOrdersS");

describe("Service Method Testing", () => {
  it("Get order test: Order list Success", async () => {
    // User email which have some previous orders
    const res = await service.getPastOrders("user-with-one-1@gmail.com");
    expect(res.length).to.greaterThan(0);
  });

  it("Get order test: Empty list", async () => {
    // User email which does not have any orders
    const res = await service.getPastOrders("TEST@gmail.com");
    expect(res.length).to.equals(0);
  });

  it("Order service insertion test: Failed status", async () => {
    const data = {
      orderArray: [
        {
          prodId: "2008",
          prodName: "Shoe",
          price: 5664,
          qty: 7,
        },
      ],
    };
    const error = await service.insertOrders(data);
    expect(error.status).to.equals(400);
  });

  it("Order service insertion test: Success response type to be Array", async () => {
    const data = {
      orderArray: [
        {
          prodId: "2008",
          prodName: "Shoe",
          price: 5664,
          qty: 7,
        },
      ],
      userEmail: "nilaksh01@gmail.com",
    };
    expect(await service.insertOrders(data)).to.be.a("Array");
  });

  it("Order service insertion test: Failed due to incomplete data", async () => {
    const data = {
      orderArray: [
        {
          prodId: "2008",
          prodName: "Shoe",
          price: 5664,
          qty: 7,
        },
      ],
    };
    const error = await service.insertOrders(data);
    assert.equal(error instanceof Error, true);
  });

  it("Order service insertion test: Failed due invalid data", async () => {
    const data = {
      orderArray: [
        {
          prodId: "2008",
          prodName: 51351,
          price: "test",
          qty: 7,
        },
      ],
    };
    const error = await service.insertOrders(data);
    assert.equal(error instanceof Error, true);
  });
});
