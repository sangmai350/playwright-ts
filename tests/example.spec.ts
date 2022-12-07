import { test, expect, Page } from '@playwright/test'
import { LoginPage } from '../page/login'
import { InventoryPage } from '../page/inventory'
import AxeBuilder from '@axe-core/playwright';
import { playAudit } from 'playwright-lighthouse';
const playwright = require('playwright');

let page: Page
let context: any;

test('user can access login', async () => {
  const browser = await playwright['chromium'].launch({
    args: ['--remote-debugging-port=9222'],
  });
  context = await browser.newContext();
  page = await context.newPage();
  const loginPage = new LoginPage(page)
  const inventoryPage = new InventoryPage(page)
  
  await page.goto('https://www.saucedemo.com/');

  await loginPage.inputUsernameTextbox('standard_user');
  await loginPage.inputPasswordTextbox('secret_sauce');

  await loginPage.clickLoginBtn();

  expect(await inventoryPage.isShoppingCartBtnVisible()).toBeTruthy()
  // expect(await new AxeBuilder({ page }).analyze()).toEqual([]) // Commented out due to accessibility inapplicable issue

  await playAudit({
    page: page,
    thresholds: {
      performance: 85,
    },
    port: 9222,
  });
});
