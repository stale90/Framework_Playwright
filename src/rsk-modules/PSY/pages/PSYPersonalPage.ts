import { Page } from '@playwright/test'
import { PSYPersonalLocator } from "../locator/PSYPersonalLocator";
import { Actions } from "../../../reusable-component/utility/ActionUtility";
import { PSYFormInputData, PSYValDataWOScenario } from "../PSYTypes";

export class PSYPersonalPage extends PSYPersonalLocator {

    readonly page: Page;
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    // Fill Personal details on RSK Application form
    async fillPersonalDetails(data: PSYFormInputData) {
        await Actions.fill(this.txt_FirstName, data.first_name, "FirstName Textbox");
        await this.fillMiddleName(data.middle_name);
        await Actions.fill(this.txt_LastName, data.last_name, "LastName Textbox");
        await this.selectGender(data.gender_status);
        await this.selectMaritalStatus(data.marital_status);
        await this.selectWidowStatus(data.widow_status);
        await Actions.fill(this.txt_FatherName, data.father_name, "FatherName Textbox");
        await Actions.fill(this.txt_MotherName, data.mother_name, "MotherName Textbox");
        await Actions.fill(this.txt_DOB, data.dob, "DOB Textbox");
        await Actions.selectDropdown(this.drp_Religion, data.religion, "Religion Dropdown");
        await Actions.addScreenshot(this.page, "Personal Info Section");
    }

    // Select Gender Radio Button
    async selectGender(gender: string) {
        await Actions.hardWait(2);
        switch (gender.toLowerCase()) {
            case 'm':
                await Actions.checkCheckbox(this.rdo_GenderM, "Male Radio");
                break;
            case 'f':
                await Actions.checkCheckbox(this.rdo_GenderF, "Female Radio");
                break;
            case 't':
                await Actions.checkCheckbox(this.rdo_GenderT, "Transgender Radio");
                break;
            default:
                throw new Error("Invalid Checkbox value received for Gender Radio");
        }
    }

    // Select Marital status Radio buttons
    async selectMaritalStatus(marriedStatus: string) {
        switch (marriedStatus.toLowerCase()) {
            case 'yes':
                await Actions.checkCheckbox(this.rdo_MaritalStatusY, "Married:Yes Checkbox");
                break;
            case 'no':
                await Actions.checkCheckbox(this.rdo_MaritalStatusN, "Married:No Checkbox");
                break;
            default:
                throw new Error("Invalid Checkbox value received for Marital Status checkbox");
        }
    }

    // fill Middle Name
    async fillMiddleName(middleName: string) {
        if (middleName.trim().length > 0)
            await Actions.fill(this.txt_MiddleName, middleName, "MiddleName Textbox");
    }

    // Select Widow status Radio buttons
    async selectWidowStatus(widowStatus: string) {
        switch (widowStatus.toLowerCase()) {
            case 'yes':
                await Actions.checkCheckbox(this.rdo_WidowStatusY, "Widow:Yes Checkbox");
                break;
            case 'no':
                await Actions.checkCheckbox(this.rdo_WidowStatusN, "Widow:No Checkbox");
                break;
            default:
                throw new Error("Invalid Checkbox value received for Widow Status checkbox");
        }
    }

    //**********************************Validation Msg Code****************** */


    async compareAlertError(
        scenario: string,
        data: Record<string, PSYValDataWOScenario>
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


    async personalFieldValidation(data: Record<string, PSYValDataWOScenario>) {
        //-------First name------
        await this.compareAlertError('first_name', data);
        await Actions.fill(this.txt_FirstName, data['first_name'].valid_input, "FirstName Textbox");

        //------Gender------
        await this.compareAlertError('gender', data);
        //alertErrorMsg = await Actions.clickAndGetDialogMessage(this.btn_SaveNext,this.page);
        await this.selectGender(data['gender'].valid_input);

        //-------married-----
        await this.compareAlertError('married', data);
        await this.selectMaritalStatus(data['married'].valid_input);

        //-------widow-----
        await this.compareAlertError('widow', data);
        await this.selectWidowStatus(data['widow'].valid_input);

        //-------Father Name-----
        await this.compareAlertError('father_name', data);
        //await Actions.click(this.txt_FatherName,'Father Name');
        await Actions.fill(this.txt_FatherName, data['father_name'].valid_input, "FatherName Textbox");

        //-------Mother Name-----
        await this.compareAlertError('mother_name', data);
        await Actions.fill(this.txt_MotherName, data['mother_name'].valid_input, "Mother Name Textbox");

        //-------DOB-----
        await this.compareAlertError('dob', data);
        await Actions.fill(this.txt_DOB, data['dob'].valid_input, "DOB Textbox");

        //-------Religion-----
        await this.compareAlertError('religion', data);
        await Actions.selectDropdown(this.drp_Religion, data['religion'].valid_input, "Religion Dropdown");
    }

    async fillDefaultValues(data: Record<string, PSYValDataWOScenario>) {
        await Actions.fill(this.txt_FirstName, data['first_name'].valid_input, "FirstName Textbox");
        await this.selectGender(data['gender'].valid_input);
        await this.selectMaritalStatus(data['married'].valid_input);
        await this.selectWidowStatus(data['widow'].valid_input);
        await Actions.fill(this.txt_FatherName, data['father_name'].valid_input, "Father Name Textbox");
        await Actions.fill(this.txt_MotherName, data['mother_name'].valid_input, "Mother Name Textbox");
        await Actions.fill(this.txt_DOB, data['dob'].valid_input, "DOB Textbox");
        await Actions.selectDropdown(this.drp_Religion, data['religion'].valid_input, "Religion Dropdown");
    }

}