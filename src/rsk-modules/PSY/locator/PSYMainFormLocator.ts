import { Page, Locator } from '@playwright/test';

export class PSYMainFormLocator {

  readonly page: Page;

  readonly chk_Agreement: Locator;
  readonly btn_SaveNext: Locator;
  readonly rdo_MAPsy: Locator;
  readonly rdo_PGPsy: Locator;
  readonly btn_ValidateForm: Locator;
  readonly btn_EditUpdateForm: Locator;
  readonly div_DialogBox: Locator;
  readonly div_DialogMessage: Locator;
  readonly btn_DialogOk: Locator;

  readonly txt_EnterOTP: Locator;
  readonly btn_PaymentProceed: Locator;
  readonly btn_ResendOTP: Locator;

  readonly lnk_PaymentGateway: Locator;

  readonly lbl_PagePayment: Locator;
  readonly lbl_FeeAmount: Locator;
  readonly lbl_ReferenceID: Locator;
  readonly btn_SuccessTransaction: Locator;
  readonly btn_FailTransaction: Locator;
  readonly str_gateway_CurrentUrl = "https://demo.mponline.gov.in/Portal/payment/FrmPayDis.aspx";
  readonly str_receipt_CurrentUrl = "/ShowReciept.aspx";
  readonly str_payment_url = "demo.mponline.gov.in";
  readonly lbl_TransactionID: Locator;
  readonly btn_Home: Locator;

  readonly chk_Declaration: Locator;
  readonly btn_Continue: Locator;
  readonly lbl_Direction1: Locator;
  readonly lbl_Direction2: Locator;
  readonly lbl_Direction3: Locator;
  readonly lbl_Direction4: Locator;
  readonly lbl_Consent: Locator;

  // duplicate receipt
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


  constructor(page: Page) {

    this.page = page;
    this.rdo_MAPsy = page.locator('#RdoPG_0');
    this.rdo_PGPsy = page.locator('#RdoPG_1');
    this.btn_SaveNext = page.getByRole('button', { name: 'Save & Next' })
    this.chk_Agreement = page.locator('#chkb');
    this.btn_ValidateForm = page.locator('#btnValidateForm');
    this.btn_EditUpdateForm = page.locator('#Btn_ResetReg');
    this.div_DialogBox = page.locator('#divMsg');
    this.div_DialogMessage = page.locator("//div[@id= 'divMsg']//tbody//tbody/tr[1]/td");
    this.btn_DialogOk = page.getByRole('button', { name: 'OK' });
    this.txt_EnterOTP = page.locator('#txtOtp');

    this.btn_PaymentProceed = page.locator('#btnpay');
    this.btn_ResendOTP = page.locator('#btnResendOTP');

    // payment page
    this.lnk_PaymentGateway = page.locator('#btnTestBankPG');
    this.lbl_PagePayment = page.getByRole('heading', { name: 'Test Payment : Online Banking' })
    this.lbl_FeeAmount = page.locator('#LBLAMOUNT');
    this.lbl_ReferenceID = page.locator('#LBLTXNID');
    this.btn_SuccessTransaction = page.locator('#btnSucess');
    this.btn_FailTransaction = page.locator('#btnFail');

    // Receipt page
    this.lbl_TransactionID = page.locator('#lbltrans');
    this.btn_Home = page.getByRole('button', { name: 'Home' });

    this.chk_Declaration = page.locator('#chkAgreed');
    this.btn_Continue = page.getByRole('button', { name: 'Continue' });
    this.lbl_Direction1 = page.locator("//td[text()='1']/following-sibling::td[1]");
    this.lbl_Direction2 = page.locator("//td[text()='2']/following-sibling::td[1]");
    this.lbl_Direction3 = page.locator("//td[text()='3']/following-sibling::td[1]");
    this.lbl_Direction4 = page.locator("//td[text()='4']/following-sibling::td[1]");
    this.lbl_Consent = page.locator("//input[@id='chkAgreed']/following-sibling::label");


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

  }
}
