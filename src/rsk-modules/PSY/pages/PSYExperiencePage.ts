import { Page } from '@playwright/test'
import { Actions } from "../../../reusable-component/utility/ActionUtility";
import { PSYFormInputData, PSYValDataWOScenario } from "../PSYTypes";
import { PSYExperienceLocator } from '../locator/PSYExperienceLocator';

export class PSYExperiencePage extends PSYExperienceLocator {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    // Fill Address Details on RSK Form
    async fillExperienceDetails(data: PSYFormInputData) {

        // ✅ Govt Teacher (Yes/No)
        if (data.is_gov_teacher === "Yes") {
            await Actions.checkCheckbox(this.rdo_GovTeacherY, "Government Teacher:Yes Radio Button");
            await Actions.selectDropdown(this.ddl_Department, data.vibhag_name, "Department Dropdown");
            await Actions.fill(this.txt_PostName, data.designation_name, "Post Name Textbox");
            await Actions.fill(this.txt_SchoolName, data.school_name, "School Name Textbox");
            await Actions.fill(this.txt_DOJ, data.admission_date, "Date of Joining");
            await Actions.selectDropdown(this.ddl_WorkDistrict, data.work_district, "Work District Dropdown");
            await Actions.fill(this.txt_DiceNo, data.school_dice_no, "School Dice Number Textbox");
        } else {
            await Actions.checkCheckbox(this.rdo_GovTeacherN, "Government Teacher:No Radio Button");
        }
        await Actions.addScreenshot(this.page, "Teacher Details Section");
    }

    // Validation Functions
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


    async validateExperienceFields(data: Record<string, PSYValDataWOScenario>) {

        //--------is Gov Teacher----------
        await this.compareAlertError('is_gov_teacher', data);
        await Actions.checkCheckbox(this.rdo_GovTeacherY, "Government Teacher:Yes Radio Button");

        //--------Department name---------
        await this.compareAlertError('teacher_dept', data);
        await Actions.selectDropdown(this.ddl_Department, data['teacher_dept'].valid_input, "Department Dropdown");

        //--------Post Name---------
        await this.compareAlertError('teacher_post_name', data);
        await Actions.fill(this.txt_PostName, data['teacher_post_name'].valid_input, "Post Name Textbox");

        //--------School Name----------
        await this.compareAlertError('teacher_school_name', data);
        await Actions.fill(this.txt_SchoolName, data['teacher_school_name'].valid_input, "School Name Textbox");

        //--------Date of Joining----------
        await this.compareAlertError('teacher_doj', data);
        await Actions.fill(this.txt_DOJ, data['teacher_doj'].valid_input, "Date of Joining");

        //--------District----------
        await this.compareAlertError('teacher_district', data);
        await Actions.selectDropdown(this.ddl_WorkDistrict, data['teacher_district'].valid_input, "Work District Dropdown");

        //--------School Dise code----------
        await this.compareAlertError('teacher_dise_code', data);
        await Actions.fill(this.txt_DiceNo, data['teacher_dise_code'].valid_input, "School Dice Number Textbox");
    }
}


