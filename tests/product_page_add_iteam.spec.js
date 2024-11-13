import { test, expect } from "@playwright/test"


test.skip ("Product Page Add To Basket", async ({page}) => {
await page.goto("/")

const AddToBasketButton = page.locator('[data-qa="product-button"]').first()
const basketCounter = page.locator('[data-qa="header-basket-count"]')

await expect(basketCounter).toHaveText("0")
await AddToBasketButton.click()

await expect(AddToBasketButton).toHaveText("Remove from Basket")
await expect(basketCounter).toHaveText("1")

const checkoutLink = page.getByRole('link', { name: 'Checkout' })
await checkoutLink.click()
await page.waitForURL('/basket')

//await page.pause()
})