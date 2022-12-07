import { Page } from "playwright-core"

export class InventoryPage {
  page: Page
  readonly shoppingCartBtn: string
  
  constructor(page: Page) {
    this.page = page
    this.shoppingCartBtn = '.shopping_cart_link'
  }

  async isShoppingCartBtnVisible(): Promise<Boolean> {
    await this.page.waitForSelector(this.shoppingCartBtn, { state: 'visible', strict: false });
    return await this.page.locator(this.shoppingCartBtn).isVisible()
  }
}