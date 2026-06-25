import { Page } from '@playwright/test'
import { Actions } from "../../../reusable-component/utility/ActionUtility";
import { DLEDPreFormLocator } from '../locator/DEDPreFormLocator';

const formUrl = 'https://staging.mponline.gov.in:1003/portal/Examinations/DED/frmEntry.aspx';

export class DEDPreFormPage extends DLEDPreFormLocator {

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
        await Actions.click(this.lnk_DElEdPrograms, "DED CounsellingCard");
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Schedule, "Counselling Schedule Tab");
        await Actions.click(this.lnk_RegForm, "New Application Form Link");
        await Actions.checkCheckbox(this.chk_Declaration,"Consent Declaration");
        await Actions.click(this.btn_Continue,"Continue CTA");
        // Handle alert popup
        const dialogPromise = Actions.activateAlertListner(this.page);
        await Actions.selectDropdown(this.ddl_IsMPBSE,'N',"MPBSE : NO");
        const alertMessage = await dialogPromise;
        await Actions.verifyCurrentUrl(this.page,formUrl,"Registration Form Url");
        //---------------------
    }

    // Navigate to Duplicate receipt
    async navigateToDuplicateReceipt() {
        await Actions.hardWait(3);
        await Actions.click(this.lnk_DElEdPrograms, "DED CounsellingCard");
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Schedule, "Counselling Schedule Tab");
        await Actions.click(this.lnk_DupReceipt, "Duplicate Receipt Link");
    }

    // Navigate to Reset Password
    async navigateToResetPassword() {
        await Actions.hardWait(3);
        await Actions.click(this.lnk_DElEdPrograms, "DED CounsellingCard");
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Schedule, "Counselling Schedule Tab");
        await Actions.click(this.lnk_resetPassword, "Reset Password Link");
    }

    // Navigate to Reset Password
    async navigateToPayUnpaid() {
        await Actions.hardWait(3);
        await Actions.click(this.lnk_DElEdPrograms, "DED CounsellingCard");
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Schedule, "Counselling Schedule Tab");
        await Actions.click(this.lnk_PayUnpaid, "Pay Unpaid Link");
    }

    // Navigate to Edit Paid Form
    async navigateToEditPaidForm() {
        await Actions.hardWait(3);
        await Actions.click(this.lnk_DElEdPrograms, "DED CounsellingCard");
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Schedule, "Counselling Schedule Tab");
        await Actions.click(this.lnk_EditPaid, "Edit Paid Link");
    }

    // Navigate to Reset Password
    async navigateToRegistrationCancel() {
        await Actions.hardWait(3);
        await Actions.click(this.lnk_DElEdPrograms, "DED CounsellingCard");
        await Actions.hardWait(3);
        await Actions.click(this.lnk_Schedule, "Counselling Schedule Tab");
        await Actions.click(this.lnk_RegCancel, "Registration Cancel Link");
    }

    async closeImportantPopup() {
        await Actions.click(this.page.getByText('×'), "Important Popup");
    }
}
