let { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");

describe("Routing Test", () => {
  it("Existing Endpoint", async () => {
    const res = await request(app).get(
      "/orders/getAllOrders/nilaksh01@gmail.com"
    );
    expect(res.status).to.equal(200);
  });

  it("Non-existing Endpoint", async () => {
    const res = await request(app).get("/not-found");
    expect(res.status).to.equal(404);
  });
});

describe("Insert Order Routing Test", () => {
  it("Order insert route: Success response message", async () => {
    const body = {
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
    //creating a request observe the URL
    const res = await request(app).post("/orders/purchaseOrders").send(body);
    //Checking for response observe the response expected
    expect(res.body.message).to.equals("Product added");
  });

  it("Order insert route: Success response status", async () => {
    const body = {
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
    //creating a request observe the URL
    const res = await request(app).post("/orders/purchaseOrders").send(body);
    //Checking for response observe the response expected
    expect(res.status).to.equals(200);
  });

  it("Order insert route: Failure response status", async () => {
    const body = {
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
    //creating a request observe the URL
    const res = await request(app).post("/orders/purchaseOrder").send(body);
    //Checking for response observe the response expected
    expect(res.status).to.equals(404);
  });
});

describe("Get Orders Routing Test", () => {
  it("Orders get route: Success response type", async () => {
    const res = await request(app).get(
      "/orders/getAllOrders/nilaksh01@gmail.com"
    );
    expect(res.body).to.be.a("Array");
  });

  it("Orders get route: Success response status", async () => {
    const res = await request(app).get(
      "/orders/getAllOrders/nilaksh01@gmail.com"
    );
    expect(res.status).to.equals(200);
  });

  it("Orders get route: Failure response status", async () => {
    const res = await request(app).get(
      "/orders/getAllOrders/newUser@gmail.com"
    );
    expect(res.status).to.equals(400);
  });
});
