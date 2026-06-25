import { Page } from "playwright/test";
import { Actions } from "../../../reusable-component/utility/ActionUtility";
import { DEDFormReport, DEDFormInputData } from "../DEDTypes";
import { DEDReceiptLocator } from "../locator/DEDReceiptLocator";


const receiptUrl = "/ded/ShowReciept.aspx";

export class DEDReceiptPage extends DEDReceiptLocator {

    readonly page: Page;
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    // Receipt - Get Transaction ID
    async getReceiptTransactionID(
        data: DEDFormInputData, 
        report: DEDFormReport
    ){
        await Actions.verifyUrlContains(this.page, receiptUrl, "Receipt page URL");
        const transactionId = await Actions.getText(this.lbl_TransactionID);
        await Actions.addStepMessage(`Transaction ID : ${transactionId}`);
        if (data.payment_status === 'success')
            report.transaction_id_2 = transactionId;
        if (data.payment_status === 'first')
            report.transaction_id_1 = transactionId;
        if (data.payment_status === 'second')
            report.transaction_id_2 = transactionId;
    }

    // Payment Details Verification
    async verifyPaymentReceiptData(data: DEDFormInputData, report: DEDFormReport) {
        await this.verifyPaymentDetails(data, report);
        await this.verifyApplicantDetails(data);
        await this.verifyOtherDetails(data);
        await this.verifyAddressDetails(data);
        await this.verifyEducationDetails(data);
        await Actions.addScreenshot(this.page, "Add Screenshot Step");
    }

    // Payment Details Verification
    async verifyPaymentDetails(data: DEDFormInputData, report: DEDFormReport) {
        await Actions.verifyText(this.lbl_Header, 'Registration Receipt', "Receipt Header");

        if (data.payment_status === 'first')
            await Actions.verifyText(this.lbl_TransactionID, report.transaction_id_1, "Transaction ID");
        if (data.payment_status === 'second')
            await Actions.verifyText(this.lbl_TransactionID, report.transaction_id_2, "Transaction ID");

        await Actions.verifyText(this.lbl_ApplicationId, report.application_id, "Application ID");
        await Actions.verifyText(this.lbl_PaidStatus, 'हाँ', 'Payment Status');
        await Actions.verifyText(this.lbl_PortalFee, data.application_fee, 'Portal Fee');
    }

    // Applicant Details Verification
    async verifyApplicantDetails(data: DEDFormInputData) {
        await Actions.verifyPartText(this.lbl_ApplicantName, data.first_name.toUpperCase(), 'Applicant First Name');
        await Actions.verifyPartText(this.lbl_ApplicantName, data.last_name.toUpperCase(), 'Applicant Last Name');
        await Actions.verifyText(this.lbl_FatherName, data.father_name.toUpperCase(), 'Father Name');
        await Actions.verifyText(this.lbl_MotherName, data.mother_name.toUpperCase(), 'Mother Name');
        await this.validateGender(data.gender_status);
        await this.validateCategory(data.category);
    }

    // Other Details Verification
    async verifyOtherDetails(data: DEDFormInputData) {
        await Actions.verifyText(this.lbl_DOB, data.dob, 'Date of Birth');
        await Actions.verifyText(this.lbl_Religion, data.religion, 'Religion');
        if (data.domicile_certificate === 'Yes') {
            await Actions.verifyText(this.lbl_Domicile, 'YES', 'Domicile Certificate');
            await Actions.verifyText(this.lbl_DomicileSelfCertify, 'NO', 'Self Certify Domicile');
            await Actions.verifyText(this.lbl_DomicileRefNo, data.dom_no, "Domicaile Cert No");
            await Actions.verifyText(this.lbl_DomIssueDate, data.dom_date, "Issue Date");
            await Actions.verifyText(this.lbl_DomDesiOfficer, data.dom_designation, "Issueing Officer Designation");
            await Actions.verifyText(this.lbl_DomissueofficeName, data.dom_place.toUpperCase(), "Domicile Office");
        } else {
            await Actions.verifyText(this.lbl_Domicile, 'YES', 'Domicile Certificate');
            await Actions.verifyText(this.lbl_DomicileSelfCertify, 'YES', 'Self Certify Domicile');
        }
        await Actions.verifyText(this.lbl_FamilyIncome,data.family_income,"Family Income");
        await this.validateExSainik(data.is_ex_sainik);
        await this.validateDisablility(data.is_disability_40per);
        await this.validateIsGovTeacher(data.is_gov_teacher);
    }

    // Education Details Verification
    async verifyEducationDetails(data: DEDFormInputData) {
        await Actions.verifyText(this.lbl_10thPassYear, data.year_10th, '10th Year');
        await Actions.verifyText(this.lbl_12thPassYear, data.year_12th, '12th Year');
    }

    // Address Details Verification
    async verifyAddressDetails(data: DEDFormInputData) {
        await Actions.verifyText(this.lbl_HouseNo, data.house_no, 'House Number');
        await Actions.verifyText(this.lbl_Landmark, data.landmark.toUpperCase(), 'Landmark');
        await Actions.verifyTextIgnoreCase(this.lbl_Village, data.city_name, 'City Name');
        await Actions.verifyText(this.lbl_State, data.state_name, 'State Name');
        await Actions.verifyText(this.lbl_District, data.district_name, 'District Name');
        await Actions.verifyText(this.lbl_Tehsil, data.tehsil_name, 'Tehsil Name');
        await Actions.verifyText(this.lbl_PinCode, data.pincode, 'Pincode');
        await Actions.verifyPartText(this.lbl_Mobile, data.mobile_no.slice(-4), 'Mobile Number');
        await Actions.verifyPartText(this.lbl_Email, data.email_id.split('@')[1], 'Email ID');
    }

    async validateGender(value: string) {
        if (value === 'M')
            await Actions.verifyText(this.lbl_Gender, 'Male', 'Male');
        else
            await Actions.verifyText(this.lbl_Gender, 'Female', 'Female');
    }

    async validateCategory(value: string) {
        if (value === 'UR')
            await Actions.verifyPartText(this.lbl_Category, 'UR', 'UR Category');
        if (value === 'OBC')
            await Actions.verifyPartText(this.lbl_Category, 'OBC', 'OBC Category');
        if (value === 'ST')
            await Actions.verifyPartText(this.lbl_Category, 'ST', 'ST Category');
        if (value === 'SC')
            await Actions.verifyPartText(this.lbl_Category, 'SC', 'SC Category');
        if (value === 'EWS')
            await Actions.verifyPartText(this.lbl_Category, 'EWS', 'EWS Category');
    }

    async validateIsGovTeacher(value: string) {
        if (value === 'Yes')
            await Actions.verifyText(this.lbl_GovTeacher, 'YES', 'Gov Teacher Label');
        else
            await Actions.verifyText(this.lbl_GovTeacher, 'NO', 'Gov Teacher Label');
    }
    async validateDisablility(value: string) {
        if (value === 'Yes')
            await Actions.verifyText(this.lbl_Handicap, 'YES', 'Handicap Label');
        else
            await Actions.verifyText(this.lbl_Handicap, 'NO', 'Handicap Label');
    }

    async validateExSainik(value: string) {
        if (value === 'Yes')
            await Actions.verifyText(this.lbl_ExServiceman, 'YES', 'Ex Service Man');
        else
            await Actions.verifyText(this.lbl_ExServiceman, 'NO', 'Ex Service Man');
    }
}

