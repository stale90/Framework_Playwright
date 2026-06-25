import { Locator, Page } from "@playwright/test";


export class PSYOtherFeatureLocator {

    readonly page: Page;

    readonly btn_DialogOk: Locator;

    // Reset Password Locators
    readonly txt_ResetApplicationNo: Locator;
    readonly txt_ResetDob: Locator;
    readonly txt_ResetEnterCode: Locator;
    readonly txt_ResetNewPwd: Locator;
    readonly txt_ResetConfirmPwd: Locator;
    readonly btn_ResetchangePwd: Locator;
    readonly btn_Resetsubmit: Locator;
    readonly lbl_ResetappID: Locator;

    // Pay unpaid  
    readonly txt_UnpaidAppNo: Locator;
    readonly txt_UnpaidDob: Locator;
    readonly txt_UnpaidMobileNo: Locator;
    readonly btn_UnpaidGetDetail: Locator;
    readonly lnk_payUnpaid: Locator;

    // Registration Cancellation
    readonly txt_CancelAppNo: Locator;
    readonly txt_CancelDob: Locator;
    readonly txt_CancelMobileNo: Locator;
    readonly btn_CancelGetDetail: Locator;
    readonly lbl_CancelAppNo: Locator;
    readonly lbl_CancelName: Locator;
    readonly lbl_CancelCategory: Locator;
    readonly txt_CancelReason: Locator;
    readonly txt_CancelPassword: Locator;
    readonly btn_CancelOtp: Locator;
    readonly txt_CancelOtp: Locator;
    readonly btn_CancelProceedToCancel: Locator;
    readonly lbl_CancelFatherName: Locator;

    // duplicate receipt
    readonly txt_DupAppNo: Locator;
    readonly txt_DupDob: Locator;
    readonly txt_DupMobileNo: Locator;
    readonly btn_DupGetDetail: Locator;
    readonly lnk_DupReprintReceipt: Locator;

    // Edit form Paid
    readonly txt_EditAppNo: Locator;
    readonly txt_EditDob: Locator;
    readonly txt_EditPassword: Locator;
    readonly btn_EditLogin: Locator;
    readonly lnk_EditAppForm: Locator;



    constructor(page: Page) {
        this.page = page;

        this.btn_DialogOk = page.getByRole('button', { name: 'OK' });

        // Reset password Locator
        this.txt_ResetApplicationNo = page.locator('#txtenrollment');
        this.txt_ResetDob = page.locator('#txtDate');
        this.btn_Resetsubmit = page.locator('#btnNext');
        this.txt_ResetEnterCode = page.locator('#txtOldPassword');
        this.txt_ResetNewPwd = page.locator('#txtNewPass');
        this.txt_ResetConfirmPwd = page.locator('#txtNewConfPass');
        this.btn_ResetchangePwd = page.locator('#btnChangePass');
        this.lbl_ResetappID = page.locator('#lblAppNo');

        // Pay Unpaid
        this.txt_UnpaidAppNo = page.locator('#txtAppNo');
        this.txt_UnpaidDob = page.locator('#txtDOB');
        this.txt_UnpaidMobileNo = page.locator('#txtMobileNo');
        this.btn_UnpaidGetDetail = page.locator('#btnView');
        this.lnk_payUnpaid = page.locator('#lnkbtnRegEntry');

        // Registration Cancellation
        this.txt_CancelAppNo = page.locator('#txtEnrollno');
        this.txt_CancelDob = page.locator('#txtDOB');
        this.txt_CancelMobileNo = page.locator('#txtMobile');
        this.btn_CancelGetDetail = page.locator('#btnView');
        this.lbl_CancelAppNo = page.locator('#SDC1_lblRollno');
        this.lbl_CancelName = page.locator('#SDC1_lblCandName');
        this.lbl_CancelCategory = page.locator('#SDC1_lblStuCat');
        this.lbl_CancelFatherName = page.locator('#SDC1_lblFatherName');

        this.txt_CancelReason = page.locator('#txtCancelReason');
        this.txt_CancelPassword = page.locator('#txtStudentPassword');
        this.btn_CancelOtp = page.locator('#btnOtp');

        this.txt_CancelOtp = page.locator('#txtOtp');
        this.btn_CancelProceedToCancel = page.locator('#btnVerifyPwd');

        // Duplicate Reprint Receipt
        this.txt_DupAppNo = page.locator('#txtAppNo');
        this.txt_DupDob = page.locator('#txtDOB');
        this.txt_DupMobileNo = page.locator('#txtMobileNo');
        this.btn_DupGetDetail = page.locator('#btnView');
        this.lnk_DupReprintReceipt = page.locator('#lnkbtnReg');

        // Edit Paid Form
        this.txt_EditAppNo = page.locator('#txtAppNo');
        this.txt_EditDob = page.locator('#txtDOB');
        this.txt_EditPassword = page.locator('#txtPassword');
        this.btn_EditLogin = page.locator('#btnView');
        this.lnk_EditAppForm = page.locator('#lnkbtnRegEntryEdit');
    }
}