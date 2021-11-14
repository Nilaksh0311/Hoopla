let { expect } = require("chai");
const model = require("../src/model/pastOrdersM");

describe("Model Testing", () => {
  it("Modal test: Get Order", async () => {
    // User email which have some previous orders
    const res = await model.getPastOrders("user-with-one-1@gmail.com");
    expect(res.length).to.greaterThan(0);
  });

  it("Modal test: Add Order", async () => {
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
    expect(await model.insertOrders(data)).to.be.a("Array");
  });
});
