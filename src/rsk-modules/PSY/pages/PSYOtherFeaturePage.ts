import { Locator, Page } from "@playwright/test";
import { PSYOtherFeatureLocator } from "../locator/PSYOtherFeatureLocator";
import { Actions } from "../../../reusable-component/utility/ActionUtility";
import { PSYFormReport, PSYFormInputData } from "../PSYTypes";
import { Utility } from "../../../reusable-component/utility/GeneralUtility";

export class PSYOtherFeaturePage extends PSYOtherFeatureLocator {

    readonly page: Page;
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    // Click Button Element and Get Verification code from popup
    async clickAndGetOTPCode(element: Locator) {
        const dialogPromise = Actions.activateAlertListner(this.page);
        await Actions.click(element, "Click button");
        const message = await dialogPromise;
        await Actions.addStepMessage(`Alert Message : ${message}`);
        const verificationCode = Utility.extractVerificationCode(message);
        return verificationCode.code;
    }

    // Reset Password for Profile
    async resetPassword(report: PSYFormReport) {
        const Password = 'Mponline@333';
        await Actions.fill(this.txt_ResetApplicationNo, report.application_id, "Application ID");
        await Actions.fill(this.txt_ResetDob, report.dob, "DOB Textbox");
        await this.page.pause();
        const otpCode = await this.clickAndGetOTPCode(this.btn_Resetsubmit);
        await Actions.verifyText(this.lbl_ResetappID, report.application_id, "Apllication ID Label");
        await Actions.fill(this.txt_ResetEnterCode, otpCode, "Enter Code Textbox");
        await Actions.fill(this.txt_ResetNewPwd, Password, "New Password");
        await Actions.fill(this.txt_ResetConfirmPwd, Password, "Confirm Password");
        report.password = Password;
        await Actions.click(this.btn_ResetchangePwd, "Change Password");
        await Actions.click(this.btn_DialogOk, "Dialog OK");
    }

    // Pay Unpaid feature
    async fillPayUnpaidform(report: PSYFormReport) {
        await Actions.fill(this.txt_UnpaidAppNo, report.application_id, "Application ID");
        await Actions.fill(this.txt_UnpaidDob, report.dob, "DOB Textbox");
        await Actions.fill(this.txt_UnpaidMobileNo, report.mobile_no, "Mobile No Textbox");
        await this.page.pause();
        await Actions.click(this.btn_UnpaidGetDetail, "Get Detail Button");
        await Actions.click(this.lnk_payUnpaid, "pay Unpaid Link");
    }

    // Receipt Reprint feature
    async fillDuplicateReceiptform(report: PSYFormReport) {
        await Actions.hardWait(3);
        await Actions.fill(this.txt_DupAppNo, report.application_id, "Application ID");
        await Actions.fill(this.txt_DupDob, report.dob, "DOB Textbox");
        await Actions.fill(this.txt_DupMobileNo, report.mobile_no, "Mobile No Textbox");
        await this.page.pause();
        await Actions.click(this.btn_DupGetDetail, "Get Detail Button");
        await Actions.click(this.lnk_DupReprintReceipt, "Reprint Receipt Link");
    }

    // Registration Cancellation feature
    async fillRegisterationCancelForm(report: PSYFormReport, data: PSYFormInputData) {
        await Actions.fill(this.txt_CancelAppNo, report.application_id, "Application ID");
        await Actions.fill(this.txt_CancelDob, report.dob, "DOB Textbox");
        await Actions.fill(this.txt_CancelMobileNo, report.mobile_no, "Mobile No Textbox");
        await this.page.pause();
        await Actions.click(this.btn_CancelGetDetail, "Get Detail Button");
        await Actions.hardWait(3);
        await Actions.verifyText(this.lbl_CancelAppNo, report.application_id, "App No");
        await Actions.verifyPartText(this.lbl_CancelName, data.first_name.toUpperCase(), "Candidate Name");
        await Actions.verifyText(this.lbl_CancelFatherName, data.father_name.toUpperCase(), "Father Name");
        await Actions.verifyPartText(this.lbl_CancelCategory, data.category, "Category");
        await Actions.fill(this.txt_CancelReason, 'Cancel', "Reason");
        await Actions.fill(this.txt_CancelPassword, report.password, "Password");
        const code = await this.clickAndGetOTPCode(this.btn_CancelOtp);
        await Actions.fill(this.txt_CancelPassword, report.password, "Password");
        await Actions.fill(this.txt_CancelOtp, code, "OTP code");
        await Actions.click(this.btn_CancelProceedToCancel, "Proceed to Cancel");

    }

    // Pay Unpaid feature
    async fillEditAuthenticationForm(report: PSYFormReport) {
        await Actions.fill(this.txt_EditAppNo, report.application_id, "Application ID");
        await Actions.fill(this.txt_EditDob, report.dob, "DOB Textbox");
        await Actions.fill(this.txt_EditPassword, report.password, "Password Textbox");
        await this.page.pause();
        await Actions.click(this.btn_EditLogin, "Login Button");
        await Actions.click(this.lnk_EditAppForm, "Edit Form Link");
    }

}