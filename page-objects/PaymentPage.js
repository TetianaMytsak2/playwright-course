import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {

        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discoutActivaMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]')
        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardValidUntil = page.locator('[data-qa="valid-until"]')
        this.creditCardCvcInput = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.locator('[data-qa="pay-button"]')
    }  

    activateDiscount = async () => {

        expect (await this.discountedValue.isVisible()).toBe(false)
        expect (await this.discoutActivaMessage.isVisible()).toBe(false)

        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()

        // Option 1 for laggy inputs: using .fill with await expect() 
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code) //when you need to wait

        // Option 2 for laggy inputs: slow input
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, { delay: 1000}) 
        // expect (await this.discountInput.inputValue()).toBe(code)


        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        await this.discoutActivaMessage.waitFor()
        
        await this.discountedValue.waitFor()
        const discountValueText = await this.discountedValue.innerText()
        const discountValueOnlyNumber = discountValueText.replace("$", "")
        const discountValueNumber = parseInt(discountValueOnlyNumber, 10)
        
        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueOnlyNumber = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlyNumber, 10)

       expect (discountValueNumber).toBeLessThan(totalValueNumber)
    }

        fillPaymentDetails = async (paymentDetails) => {

        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(paymentDetails.owner)
        await this.creditCardNumberInput.waitFor()
        await this.creditCardNumberInput.fill(paymentDetails.number)
        await this.creditCardValidUntil.waitFor()
        await this.creditCardValidUntil.fill(paymentDetails.validUntil)
        await this.creditCardCvcInput.waitFor()
        await this.creditCardCvcInput.fill(paymentDetails.cvc)

        }

        complitePayment = async () =>{

        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/payment/)
        
        }
}