import puppeteer from 'puppeteer';
// no components to import because the browser renders them

describe('show/hide an event\'s details', () => {
  let browser;
  let page;
  jest.setTimeout(100000);
  
  beforeAll(async () => {
    // browser = await puppeteer.launch();
    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ['--disable-extensions'] // helps prevent time outs
    });
    page = await browser.newPage();
    await page.goto(`http://localhost:3000/`);
    await page.waitForSelector('.event'); // load Event
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details'); // if .details is present, the event is expanded, if not it's collapsed
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  },);

  test('User can collapse an event\'s details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

});