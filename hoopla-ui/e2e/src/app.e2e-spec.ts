import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(function() {
    let originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;
});
  it('should navigate to dashboard page', async () => {
   await  browser.get('http://localhost:4200');
    expect(browser.getCurrentUrl()).toContain('dashboard');
  });

  it('should login successfully', async () => {
   await  browser.get('http://localhost:4200');
    await element(by.id('login')).click();
    await element(by.name('email')).sendKeys('nikhil@gmail.com');
    await element(by.name('password')).sendKeys('Nikhil@123');
    await element(by.name('logins')).click();
    await expect(browser.getCurrentUrl()).toContain('dashboard');
  });

  // it('should add products to the cart', async()=>{
  //  await  browser.get('http://localhost:4200');
  //   await element(by.id('login')).click();
  //   await element(by.name('email')).sendKeys('nikhil@gmail.com');
  //   await element(by.name('password')).sendKeys('Nikhil@123');
  //   await element(by.name('logins')).click();
  //   await element(by.name('clothespic')).click();

  // })

  it('should register as a new user', async()=>{
    await browser.get('http://localhost:4200');
    await element(by.id('login')).click();
    await element(by.name('register')).click();
    await element(by.name('username')).sendKeys('sai');
    await element(by.name('dob')).sendKeys(2121996);
    await element(by.name('email')).sendKeys('sai123@gmail.com');
    await element(by.name('password')).sendKeys('Sai@4321');
    await element(by.name('number')).sendKeys(7654345897);
    await element(by.name('registerb')).click();
    await expect(browser.getCurrentUrl()).toContain('dashboard');

  })

  it("should go to cart and order the products",async ()=>{
    await  browser.get('http://localhost:4200');
    await element(by.id('login')).click();
    await element(by.name('email')).sendKeys('nikhil@gmail.com');
    await element(by.name('password')).sendKeys('Nikhil@123');
    await element(by.name('logins')).click();
    await element(by.id('shoppingcart')).click();
    await element(by.id('checkout')).click();
    await expect(browser.getCurrentUrl()).toContain('orders');
  })

  it("should login as seller and able to view seller profile", async()=>{
    await  browser.get('http://localhost:4200');
    await element(by.id('login')).click();
    await element(by.name('email')).sendKeys('nikhil@gmail.com');
    await element(by.name('password')).sendKeys('Nikhil@123');
    await element(by.name('logins')).click();
    await element(by.id('seller')).click();
    await element(by.name('loginemail')).sendKeys('nikhil@gmail.com');
    await element(by.name('loginpass')).sendKeys('Nikhil@123');
    await element(by.name('loginbutton')).click();
    await element(by.name('sellerprofile')).click();  
  })

  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(
  //     jasmine.objectContaining({
  //       level: logging.Level.SEVERE,
  //     } as logging.Entry)
  //   );
  // });
});
