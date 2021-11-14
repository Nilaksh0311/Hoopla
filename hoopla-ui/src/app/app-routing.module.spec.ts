import { routes } from '../app/app-routing.module';

describe('App Routing Module', () => {
  it('Check if login route is present', () => {
    let flag = 0;
    for (const element of routes) {
      if (
        /^login$/i.test(element.path) &&
        element.component.name == 'LoginComponent'
      ) {
        flag++;
      }
    }
    expect(flag).toBe(1);
  });
  it('Check if dashboard route is present', () => {
    let flag = 0;
    for (const element of routes) {
      if (
        /^dashboard$/i.test(element.path) &&
        element.component.name == 'DashboardComponent'
      ) {
        flag++;
      }
    }
    expect(flag).toBe(1);
  });
  it('Check if register route is present', () => {
    let flag = 0;
    for (const element of routes) {
      if (
        /^register$/i.test(element.path) &&
        element.component.name == 'SignUpComponent'
      ) {
        flag++;
      }
    }
    expect(flag).toBe(1);
  });
  it('Check if Cart route is present', () => {
    let flag = 0;
    for (const element of routes) {
      if (
        /^cart$/i.test(element.path) &&
        element.component.name == 'CartComponent'
      ) {
        flag++;
      }
    }
    expect(flag).toBe(1);
  });
  it(' Check if search route is present', () => {
    let flag = 0;
    for (const element of routes) {
      if (
        /^search$/i.test(element.path) &&
        element.component.name == 'SearchComponent'
      ) {
        flag++;
      }
    }
    expect(flag).toBe(1);
  });
  it('Check if product-details route is present', () => {
    let flag = 0;
    for (const element of routes) {
      if (
        /^product-details$/i.test(element.path) &&
        element.component.name == 'ProductDetailsComponent'
      ) {
        flag++;
      }
    }
    expect(flag).toBe(1);
  });

  it('Check if orders route is present', () => {
    let flag = 0;
    for (const element of routes) {
      if (
        /^orders$/i.test(element.path) &&
        element.component.name == 'OrdersComponent'
      ) {
        flag++;
      }
    }
    expect(flag).toBe(1);
  });
  it('Check if sellerlogin route is present', () => {
    let flag = 0;
    for (const element of routes) {
      if (
        /^sellerlogin$/i.test(element.path) &&
        element.component.name == 'SellerLoginComponent'
      ) {
        flag++;
      }
    }
    expect(flag).toBe(1);
  });
  it('Check if seller register route is present', () => {
    let flag = 0;
    for (const element of routes) {
      if (
        /^sellerregister$/i.test(element.path) &&
        element.component.name == 'SellerRegisterComponent'
      ) {
        flag++;
      }
    }
    expect(flag).toBe(1);
  });
  it('Check if seller page route is present', () => {
    let flag = 0;
    for (const element of routes) {
      if (
        /^sellerpage$/i.test(element.path) &&
        element.component.name == 'SellerpageComponent'
      ) {
        flag++;
      }
    }
    expect(flag).toBe(1);
  });
  it('Check if update product route is present', () => {
    let flag = 0;
    for (const element of routes) {
      if (
        /^updateproduct$/i.test(element.path) &&
        element.component.name == 'UpdateProductComponent'
      ) {
        flag++;
      }
    }
    expect(flag).toBe(1);
  });
});
