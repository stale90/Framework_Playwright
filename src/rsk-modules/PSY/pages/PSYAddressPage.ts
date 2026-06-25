import { Page } from '@playwright/test'
import { Actions } from "../../../reusable-component/utility/ActionUtility";
import { PSYFormInputData, PSYValDataWOScenario } from "../PSYTypes";
import { PSYAddressLocator } from '../locator/PSYAddressLocator';

export class PSYAddressPage extends PSYAddressLocator {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    // Fill Address Details on RSK Form
    async fillAddressDetails(data: PSYFormInputData) {
        await Actions.fill(this.txt_HouseNo, data.house_no, "House No. Textbox");
        await Actions.fill(this.txt_LandMark, data.landmark, "LandMark Textbox");
        await Actions.fill(this.txt_City, data.city_name, "City Textbox");
        await Actions.selectDropdown(this.ddl_State, data.state_name, "State Dropdown");
        await Actions.selectDropdown(this.ddl_District, data.district_name, "District Dropdown");
        await Actions.selectDropdown(this.ddl_Tehsil, data.tehsil_name, "Tehsil Dropdown");
        await Actions.fill(this.txt_MobileNo, data.mobile_no, "Mobile No Textbox");
        await Actions.fill(this.txt_EmailID, data.email_id, "Email Textbox");
        //await this.page.pause();
        await Actions.fill(this.txt_Pincode, data.pincode, "PinCode Textbox");
        await Actions.addScreenshot(this.page, "Address Section");
    }

    // ------------Validation Functions--------------
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

    async validateAddressFields(data: Record<string, PSYValDataWOScenario>) {
        //--------House No----------
        await this.compareAlertError('house_no', data);
        await Actions.fill(this.txt_HouseNo, data['house_no'].valid_input, "House No. Textbox");

        //-------- Location ---------
        await this.compareAlertError('location', data);
        await Actions.fill(this.txt_LandMark, data['location'].valid_input, "LandMark Textbox");

        //-------- City---------
        await this.compareAlertError('city', data);
        await Actions.fill(this.txt_City, data['city'].valid_input, "City Textbox");

        //-------- State----------
        await this.compareAlertError('state', data);
        await Actions.selectDropdown(this.ddl_State, data['state'].valid_input, "State Dropdown");

        //--------District----------
        await this.compareAlertError('district', data);
        await Actions.selectDropdown(this.ddl_District, data['district'].valid_input, "District Dropdown");

        //--------Tehsil---------
        await this.compareAlertError('tehsil', data);
        await Actions.selectDropdown(this.ddl_Tehsil, data['tehsil'].valid_input, "Tehsil Dropdown");

        //-------- Mobile NO ----------
        await this.compareAlertError('mobile_no', data);
        await Actions.fill(this.txt_MobileNo, data['mobile_no'].valid_input, "Mobile No Textbox");

        //--------Pincode---------
        await this.compareAlertError('pincode', data);
        await Actions.fill(this.txt_Pincode, data['pincode'].valid_input, "PinCode Textbox");

        await Actions.addScreenshot(this.page, "Address Validation");
    }
}


