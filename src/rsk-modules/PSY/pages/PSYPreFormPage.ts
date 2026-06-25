import { Page } from '@playwright/test'
import { Actions } from "../../../reusable-component/utility/ActionUtility";
import { Logger } from '../../../reusable-component/config/LoggerSetup';
import { PSYPreFormLocator } from '../locator/PSYPreFormLocator';

export class PSYPreFormPage extends PSYPreFormLocator {

    readonly page: Page;
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async navigateToHome() {
        await Actions.click(this.lnk_Home, "Home Link");
    }

    // Navigate till Application Form
    async navigateToForm() {
        try {
            await Actions.click(this.lnk_Header, "Home page header");
            await Actions.click(this.lnk_PsychologyPost, "MA Psychology Card");
            await Actions.hardWait(3);
            await Actions.click(this.lnk_Schedule, "Counselling Schedule Tab");
            await Actions.click(this.lnk_RegForm, "New Application Form Link");
        } catch (error) {
            Logger.throwException('Exception occured while Opening URL.', error);
        }
    }

    // Navigate to Duplicate receipt
    async navigateToDuplicateReceipt() {
        //await Actions.click(this.lnk_Home,"Home Link");
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Header, "Home page header");
        await Actions.click(this.lnk_PsychologyPost, "MA Psychology Card");
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Schedule, "Counselling Schedule Tab");
        await Actions.click(this.lnk_DupReceipt, "Duplicate Receipt Link");
    }

    // Navigate to Reset Password
    async navigateToResetPassword() {
        //await Actions.click(this.lnk_Home,"Home Link");
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Header, "Home page header");
        await Actions.click(this.lnk_PsychologyPost, "MA Psychology Card");
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Schedule, "Counselling Schedule Tab");
        await Actions.click(this.lnk_resetPassword, "Reset Password Link");
    }

    // Navigate to Reset Password
    async navigateToPayUnpaid() {
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Header, "Home page header");
        await Actions.click(this.lnk_PsychologyPost, "MA Psychology Card");
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Schedule, "Counselling Schedule Tab");
        await Actions.click(this.lnk_PayUnpaid, "Pay Unpaid Link");
    }

    // Navigate to Edit Paid Form
    async navigateToEditForm() {
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Header, "Home page header");
        await Actions.click(this.lnk_PsychologyPost, "MA Psychology Card");
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Schedule, "Counselling Schedule Tab");
        await Actions.click(this.lnk_EditPaid, "Edit Paid Link");
    }

    // Navigate to Reset Password
    async navigateToRegistrationCancel() {
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Header, "Home page header");
        await Actions.click(this.lnk_PsychologyPost, "MA Psychology Card");
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Schedule, "Counselling Schedule Tab");
        await Actions.click(this.lnk_RegCancel, "Registration Cancel Link");
    }

    async closeImportantPopup() {
        await Actions.click(this.page.getByText('×'), "Important Popup");
    }
}
