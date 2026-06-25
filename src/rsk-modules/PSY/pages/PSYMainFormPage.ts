import { expect, Locator, Page } from '@playwright/test'
import { Actions } from "../../../reusable-component/utility/ActionUtility";
import { PSYFormReport, PSYFormInputData } from "../PSYTypes";
import { PSYMainFormLocator } from '../locator/PSYMainFormLocator';
import { Logger } from '../../../reusable-component/config/LoggerSetup';
import { Utility } from '../../../reusable-component/utility/GeneralUtility';

export class PSYMainFormPage extends PSYMainFormLocator {

    readonly page: Page;
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    labels = {
        lbl_Direction1: "मप्र के मूल निवासी हेतु सक्षम अधिकारी द्वारा जारी प्रमाण पत्र होना अनिवार्य है|(M.A.(Psychology)/ Post Graduate Diploma in Guidance नियम देखें)",
        lbl_Direction2: "जाति एवं संवर्ग के लिए सक्षम अधिकारी का प्रमाण पत्र होना अनिवार्य है ।",
        lbl_Direction3: `आवेदक ऑनलाइन फार्म भरने के पश्चात अपना नाम, पिता/पति का नाम, माता का नाम, जन्मतिथि,
                        स्थाई पता, प्राप्तांकों तथा कुल अंको का विवरण, मोबाइल नंबर एवं अपनी फोटो अवश्य जाँच
                        लें ।`,
        lbl_Direction4: `भुगतान संबंधी : आवेदक / उम्मीद्वार कृपया यह सुनिश्चित कर ले कि उनके द्वारा किया
                        गया भुगतान / पेमेंट सही हैं एवं उसे "भुगतान हैं" / सक्सेस पेमेंट की रसीद प्राप्त
                        हो गयी हैं । यदि किसी कारण वश ऑनलाइन नेट बैंकिंग / क्रेडिट कार्ड / डेबिट कार्ड से
                        भुगतान / पेमेंट नहीं हो पाता हैं तो कृपया कर पुनः प्रयास करे या फिर किसी निकटतम
                        किओस्क के पास जाकर फीस जमा कर "भुगतान हैं" / सक्सेस पेमेंट की रसीद प्राप्त करें।
                        ऑनलाइन नेट बैंकिंग / क्रेडिट कार्ड / डेबिट कार्ड से पैसे कट जाने एवं भुगतान न होने
                        की स्थिति में उम्मीदवारों का कटा हुआ पैसा उनके अकाउंट में वापिस / रिफ़ंड कर दिया
                        जावेगा ।`,
        lbl_Consent: "  मैं सत्यापित/घोषणा करता/करती हूं कि मैंने प्रवेश नियम में दी गई समस्त जानकारियां एवं शर्तें अच्छी तरह पढ़ ली हैं और वचन देता/देती हूं कि इनका पालन करुंगा/करुंगी।"
    };

    // Select Couselling Course
    async openApplicationForm() {
        //await Actions.verifyTextPartial(this.lbl_Direction1, this.labels.lbl_Direction1, "Directions 1");
        //await Actions.verifyTextPartial(this.lbl_Direction2, this.labels.lbl_Direction2, "Directions 2");
        //await Actions.verifyTextPartial(this.lbl_Direction3, this.labels.lbl_Direction3, "Directions 3");
        //await Actions.verifyTextPartial(this.lbl_Direction4, this.labels.lbl_Direction4, "Directions 4");
        //await Actions.verifyTextPartial(this.lbl_Consent, this.labels.lbl_Consent, "Consent 1");
        await Actions.checkCheckbox(this.chk_Declaration, "Self Declaration Checkbox")
        await Actions.click(this.btn_Continue, "Continue Button");
    }

    // Select Couselling Course
    async selectCousellingCourse(data: PSYFormInputData) {
        if (data.course_applied_for === "PG")
            await Actions.checkCheckbox(this.rdo_PGPsy, "PG Deploma Radio Button");
        else
            await Actions.checkCheckbox(this.rdo_MAPsy, "M.A. Psychology Radio Button");
    }

    // Select Consent CheckBox 
    async checkUserConsent(data: PSYFormInputData) {
        if (data.consent_status === "Yes")
            await Actions.checkCheckbox(this.chk_Agreement, "Consent CheckBox");
    }

    // Select Save & Next CTA 
    async saveAndGetAppID() {
        await Actions.click(this.btn_SaveNext, "Save & Next CTA");
        const appID = this.getApplicationID();
        return appID;
    }

    // Select Save & Next CTA 
    async saveChanges() {
        await Actions.click(this.btn_SaveNext, "Save & Next CTA");
        await Actions.waitForVisible(this.div_DialogBox, "Changes Saved : Alert box");
        await Actions.click(this.btn_DialogOk, "Dialog OK Button");
    }


    // Click Validate CTA 
    async validateFormAndGetCode() {
        const dialogPromise = Actions.handleMultipleAlert(this.page, 5);
        await Actions.click(this.btn_ValidateForm, "Validate Information CTA");
        const allMessages = await dialogPromise;
        for (const message of allMessages) {
            await Actions.addStepMessage(`Alert Message : ${message}`);
        }
        const lastMessage = allMessages[allMessages.length - 1];
        const verificationCode = Utility.extractVerificationCode(lastMessage);
        Logger.info('Verification Code : ' + verificationCode.code);
        await Actions.click(this.btn_DialogOk, "Dialog OK");
        return verificationCode;
    }


    async proceedForPayment(code: string) {
        await Actions.fill(this.txt_EnterOTP, code, "Verification Code TextBox");
        await Actions.click(this.btn_PaymentProceed, "Proceed Payment CTA")
        await Actions.verifyCurrentUrl(this.page, this.str_gateway_CurrentUrl, "Test Payment Gateway");
    }

    // Click Validate CTA 
    async getReferenceID() {
        await Actions.waitForVisible(this.lnk_PaymentGateway, "Test Gateway page");
        await Actions.click(this.lnk_PaymentGateway, "Test Bank Payment Gateway");
        await Actions.verifyUrlContains(this.page, this.str_payment_url, "Payment page URL");
        await Actions.waitForVisible(this.lbl_ReferenceID, "Reference ID");
        const referenceId = await Actions.getText(this.lbl_ReferenceID);
        Logger.info('Reference ID : ' + referenceId);
        await Actions.addStepMessage(`Reference ID : " ${referenceId}`);
        return referenceId;
    }

    // Make Final Payment : Success/Failure
    async makePayment(status: string) {
        let payStatus = 'No';
        if (status === 'fail') {
            Logger.info('Payment Transaction blocked');
            await Actions.click(this.btn_FailTransaction, "Payment Failure");
        } else {
            await Actions.click(this.btn_SuccessTransaction, "Payment Success");
            payStatus = 'Yes';
        }
        return payStatus;
    }

    async verifyPaymentDetails(data: PSYFormInputData, report: PSYFormReport) {
        const referenceid = await this.getReferenceID();
        if (data.payment_status === 'fail' || data.payment_status === 'first')
            report.reference_id_1 = referenceid;
        if (data.payment_status === 'success' || data.payment_status === 'second')
            report.reference_id_2 = referenceid;
        
        await Actions.verifyText(this.lbl_FeeAmount, data.application_fee, "Payment Fee");
        report.application_fee = data.application_fee;
        report.pay_status = await this.makePayment(data.payment_status);
    }

    // Verify Application fee
    async verifyApplicationFee(applicationFee: string) {
        await Actions.verifyText(this.lbl_FeeAmount, applicationFee, "Payment Fee");
        return applicationFee;
    }

    // Select Save & Next CTA 
    async getApplicationID() {
        await Actions.waitForVisible(this.div_DialogBox, "Application ID : Alert box");
        let message = await Actions.getText(this.div_DialogMessage);
        await Actions.addStepMessage(`Alert Box Message ${message}`);
        let applicationID = Utility.getApplicationIdFromMessage(message);
        await Actions.addStepMessage(`Application ID :  ${applicationID}`);
        Logger.info("Application ID : " + applicationID);
        await Actions.click(this.btn_DialogOk, "Dialog OK Button");
        return applicationID;
    }

}


