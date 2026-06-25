import { Page } from '@playwright/test'
import { Actions } from "../../../reusable-component/utility/ActionUtility";
import { DEDDomicileLocator } from '../locator/DEDDomicileLocator';
import { DEDFormInputData, DEDValDataWOScenario } from '../DEDTypes';

export class DEDDomicilePage extends DEDDomicileLocator {

    readonly page: Page;
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async fillDomicileDetails(data: DEDFormInputData) {
        await Actions.selectDropdown(this.ddl_State, data.domicile_state, "State Dropdown");
        await Actions.click(this.ddl_State, "State Dropdown");

        // Domicile Certificate (Yes/No)
        if (data.domicile_certificate === "Yes") {
            await Actions.checkCheckbox(this.rdo_DomCertificate, "Domicile Certificate Checkbox");
            await Actions.fill(this.txt_DomicileRefNo, data.dom_no, "Domicile Ref No");
            await Actions.fill(this.txt_DomicileDateOfIssue, data.dom_date, "Domicile Date");
            await Actions.fill(this.txt_DomicileOffice, data.dom_place, "Domicile Office");
            if (data.dom_designation === "Other"){
                await Actions.selectDropdown(this.ddl_DomicileDesignation, 'Other', "Other Designation");
                await Actions.fill(this.txt_DomicileOtherIssuingOfficer, data.dom_other_designation, "Other Designation");
            }    
            else
                await Actions.selectDropdown(this.ddl_DomicileDesignation, data.dom_designation, "Domicile Designation");
        } else {
            await Actions.checkCheckbox(this.rdo_SelfDeclCert, "Self Declare Certificate Checkbox");
        }

        await Actions.selectDropdown(this.ddl_Category, data.category, "Category Dropdown");
        if (data.category === "OBC" || data.category === "SC" || data.category === "ST") {
            await Actions.fill(this.txt_CategoryRefNo, data.cast_certificate_no, "Cast Certificate TextBox");
            await Actions.fill(this.txt_CategoryDateOfIssue, data.cast_issue_date, "Cast Certificate Issue Date");
            await Actions.fill(this.txt_CategoryIssuingOfficer, data.cast_cert_place, "Cast Certificate Issuing Place");
            await Actions.selectDropdown(this.ddl_CategoryDesignation, data.cast_cert_designation, "Cast Certificate Issuing Designation");
        }
        await Actions.fill(this.txt_FamilyIncome,data.family_income, "Annual Family Income");
        await this.selectExServiceman(data.is_ex_sainik);
        await this.selectDisability(data.is_disability_40per, data.disability_type);
        await Actions.addScreenshot(this.page, "Domicile Details Section");
    }

    async selectDisability(is_disability_40per: string, disability_type: string) {
        if (is_disability_40per === "Yes") {
            await Actions.checkCheckbox(this.rdo_Disability40_Y, "40 Percent Disability:Yes Radio Button");
            switch (disability_type) {
                case "LH":
                    await Actions.checkCheckbox(this.rdo_Disability_LH, "Disability Type :LH Radio Button");
                    break;
                case "VH":
                    await Actions.checkCheckbox(this.rdo_Disability_VH, "Disability Type :VH Radio Button");
                    break;
                case "DH":
                    await Actions.checkCheckbox(this.rdo_Disability_DH, "Disability Type :DH Radio Button");
                    break;
                case "MH":
                    await Actions.checkCheckbox(this.rdo_Disability_MH, "Disability Type :MH Radio Button");
                    break;
                default:
                    throw new Error("Invalid Checkbox value received for Disablility Type Radio");
            }
        } else {
            await this.rdo_Disability40_N.check();
        }
    }

    // Select Disability
    async select40Disability(is_disability_40per: string) {
        if (is_disability_40per === "Yes") {
            await Actions.checkCheckbox(this.rdo_Disability40_Y, "Disabiliy : Yes");
        } else {
            await Actions.checkCheckbox(this.rdo_Disability40_N, "Disability : NO");
        }
    }


    // Select Ex Service man
    async selectExServiceman(is_ex_sainik: string) {
        if (is_ex_sainik === "Yes") {
            await Actions.checkCheckbox(this.rdo_ExServiceman_Y, "Ex ServiceMan:Yes Radio Button");
        } else {
            await Actions.checkCheckbox(this.rdo_ExServiceman_N, "Ex ServiceMan:No Radio Button");
        }
    }

// Validation Functions
async compareAlertError(
        scenario: string,
        data: Record<string, DEDValDataWOScenario>
    ): Promise<void> {
        
        let actualError: string;
        let flag: boolean;
        const expectedError = data[scenario].expected_error_message;
        const btn_SaveNext = this.page.getByRole('button', { name: 'Save & Next' });
        actualError = await Actions.clickAndGetAlertMsg(this.page, btn_SaveNext);
        data[scenario].actual_error_message = actualError;
        flag = await Actions.compareString(actualError, expectedError);
        if (flag) {
            await Actions.addStepMessage(`PASS : ${data[scenario].test_id}-${data[scenario].test_desc}`);
            data[scenario].test_status = 'PASS';
        }
        else {
            await Actions.addStepMessage(`FAIL : ${data[scenario].test_id}-${data[scenario].test_desc}`);
            data[scenario].test_status = '**FAIL**';
        }
    }

    async validateDomicileFields(data: Record<string, DEDValDataWOScenario>) {

        //--------Domicile State----------
        await this.compareAlertError('domicile_state', data);
        await Actions.selectDropdown(this.ddl_State, data['domicile_state'].valid_input, "Domicile State Dropdown");

        //--------Domicile Cert Type----------
        await this.compareAlertError('domicile_cert_type', data);
        await Actions.checkCheckbox(this.rdo_DomCertificate, "Domicile Certificate Checkbox");

        //--------Domicile Ref No----------
        await this.compareAlertError('dom_ref_no', data);
        await Actions.fill(this.txt_DomicileRefNo, data['dom_ref_no'].valid_input, "Domicile Ref No");

        //--------Domicile Issue Date----------
        await this.compareAlertError('dom_issue_date', data);
        await Actions.fill(this.txt_DomicileDateOfIssue, data['dom_issue_date'].valid_input, "Date of Issue Textbox");

        //--------Domicile Issue Place----------
        await this.compareAlertError('dom_issue_place', data);
        await Actions.fill(this.txt_DomicileOffice, data['dom_issue_place'].valid_input, "Domicile Ref No");

        //--------Domicile Issue Officer----------
        await this.compareAlertError('dom_issue_officer', data);
        await Actions.selectDropdown(this.ddl_DomicileDesignation, data['dom_issue_officer'].valid_input, "Domicile Designation");

        //--------Category---------
        await this.compareAlertError('category', data);
        await Actions.selectDropdown(this.ddl_Category, data['category'].valid_input, "Category");

        //--------Category Ref No.---------
        await this.compareAlertError('category_ref_no', data);
        await Actions.fill(this.txt_CategoryRefNo, data['category_ref_no'].valid_input, "Cast Certificate TextBox");

        //--------Category Issue Date----------
        await this.compareAlertError('category_issue_date', data);
        await Actions.fill(this.txt_CategoryDateOfIssue, data['category_issue_date'].valid_input, "Date of Issue Textbox");

        //--------Category Issue Place----------
        await this.compareAlertError('category_issue_place', data);
        await Actions.fill(this.txt_CategoryIssuingOfficer, data['category_issue_place'].valid_input, "Domicile Ref No");

        //--------Category Issue Officer----------
        await this.compareAlertError('category_issue_officer', data);
        await Actions.selectDropdown(this.ddl_CategoryDesignation, data['category_issue_officer'].valid_input, "Domicile Designation");

         //--------Family Income----------
        await this.compareAlertError('family_income', data);
        await Actions.fill(this.txt_FamilyIncome, data['family_income'].valid_input, "Family Income Textbox");

        //--------Ex Sainik----------
        await this.compareAlertError('is_ex_sainik', data);
        await this.selectExServiceman(data['is_ex_sainik'].valid_input);

        //--------is Handicapped----------
        await this.compareAlertError('is_handicapped', data);
        await this.select40Disability(data['is_handicapped'].valid_input);

        //--------Handicapped Type----------
        await this.compareAlertError('handicap_type', data);
        await this.select40Disability('No');
    }

}