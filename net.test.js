const {expect} = require ("chai");
const { clickElement,  getText } = require("./lib/commands.js");
const day = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Buy ticket", () => {
  beforeEach(async () => {
      await page.goto("http://qamid.tmweb.ru/client/index.php", {
          timeout: 20000,
      });
      await clickElement(page, day.secondDay);
  });

test("Should buy ticket", async () => {
  await clickElement(page, "[data-seance-start='1140']");
  await clickElement(page, ".buying-scheme__wrapper > div:nth-child(1) > span:nth-child(1)");
  await clickElement(page, ".acceptin-button");

  const actual = await getText(page, "h2.ticket__check-title");
  expect(actual).contain("Вы выбрали билеты:");
}, 20000);

test("Should buy VIP ticket", async () => {
  await clickElement(page, "[data-seance-start='840']");
  await clickElement(page, ".buying-scheme__wrapper > div:nth-child(1) > span:nth-child(2)");
  await clickElement(page, ".acceptin-button");

  const actual = await getText(page, "h2.ticket__check-title");
  expect(actual).contain("Вы выбрали билеты:");
}, 20000);


test("Should't buy ticket", async () => {
  await clickElement(page, "[data-seance-id='129']");

  const isDisabled = await page.$eval("button", (button) => button.disabled);
  expect(isDisabled).to.equal(true);
}, 20000);
});