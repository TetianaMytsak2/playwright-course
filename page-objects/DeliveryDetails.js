import { expect } from "@playwright/test" 

export class DeliveryDetails {
   
    constructor (page) {
        this.page=page

        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]')
        this.streetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postcodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.saveAdressButton = page.locator('[data-qa="save-address-button"]')
        this.savedAdressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedAdressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAdressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAdressStreet= page.locator('[data-qa="saved-address-street"]')
        this.savedAdressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAdressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAdressCountry = page.locator('[data-qa="saved-address-country"]')
        this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]')
    }

    fillDetails = async (userAddress) => {

        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAddress.firstName)

        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userAddress.lastName)

        await this.streetInput.waitFor()
        await this.streetInput.fill(userAddress.street)

        await this.postcodeInput.waitFor()
        await this.postcodeInput.fill(userAddress.postcode)

        await this.cityInput.waitFor()
        await this.cityInput.fill(userAddress.city)

        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption(userAddress.country)
        
    }

    saveDatails = async () => {

        const adressCountBeforeSaving = await this.savedAdressContainer.count()
        await this.saveAdressButton.waitFor()
        await this.saveAdressButton.click()
        await expect(this.savedAdressContainer).toHaveCount(adressCountBeforeSaving + 1)

        await this.savedAdressFirstName.first().waitFor()
        expect (await this.savedAdressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
       
        await this.savedAdressLastName.first().waitFor()
        expect (await this.savedAdressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())

        await this.savedAdressStreet.first().waitFor()
        expect (await this.savedAdressStreet.first().innerText()).toBe(await this.streetInput.inputValue())

        await this.savedAdressPostcode.first().waitFor()
        expect (await this.savedAdressPostcode.first().innerText()).toBe(await this.postcodeInput.inputValue())

        await this.savedAdressCity.first().waitFor()
        expect (await this.savedAdressCity.first().innerText()).toBe(await this.cityInput.inputValue())

        await this.savedAdressCountry.first().waitFor()
        expect (await this.savedAdressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())
    }

    continueToPayment = async () => {
        
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL('/payment')
    }
}