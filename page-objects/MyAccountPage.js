export class MyAccountPage {
    constructor (page) {
        this.page = page

        this.pageHeading = page.getByRole('heading', {name: 'MyAccount'})
    }

    visit = async () => {
        await this.page.goto("/my-account")
    }

}