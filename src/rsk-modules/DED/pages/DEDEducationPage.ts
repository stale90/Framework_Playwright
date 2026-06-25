import { Page } from '@playwright/test'
import { Actions } from "../../../reusable-component/utility/ActionUtility";
import { DEDFormInputData, DEDValDataWOScenario } from "../DEDTypes";
import { DEDEducationLocator } from '../locator/DEDEducationLocator';

export class DEDEducationPage extends DEDEducationLocator {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    // Fill Address Details on RSK Form
    async fillEducationDetails(data: DEDFormInputData) {
        // 10th Details
        await Actions.fill(this.txt_10thPassYear, data.year_10th, "10th Pass Year");
        if (data.result_type_10th === "P") {
            await Actions.selectDropdown(this.ddl_10thGradPer, data.result_type_10th, "10th Result Type: Percentage");
            await Actions.fill(this.txt_10thObtMarks, data.obtain_marks_10th, "10th Obtained Marks");
            await Actions.fill(this.txt_10thOutOf, data.outof_marks_10th, "10th Out Of Marks");
        } else {
            await Actions.selectDropdown(this.ddl_10thGradPer, data.result_type_10th, "10th Result Type: Grade");
            await Actions.fill(this.txt_10thGrade, data.grade_10th, "10th Grade");
            await Actions.fill(this.txt_10thPercentage, data.percent_10th, "10th Percentage");
        }
        await Actions.selectDropdown(this.ddl_10thBoard, data.board_10th, "10th Board");
        await Actions.fill(this.txt_10thRollNo, data.roll_no_10th, "10th Roll No");

        // ✅ 12th Details
        await this.select12thCourse(data.subject_12th);
        await Actions.fill(this.txt_12thPassYear, data.year_12th, "12th Pass Year");

        if (data.result_type_12th === "P") {
            await Actions.selectDropdown(this.ddl_12thGradPer, data.result_type_12th, "12th Result Type:Percentage");
            await Actions.fill(this.txt_12thObtMarks, data.obtain_marks_12th, "12th Obtained Marks");
            await Actions.fill(this.txt_12thOutOf, data.outof_marks_12th, "12th Out Of Marks");
        } else {
            await Actions.selectDropdown(this.ddl_12thGradPer, data.result_type_12th, "12th Result Type: Grade");
            await Actions.fill(this.txt_12thPercent, data.percent_12th, "12th Percentage");
            await Actions.fill(this.txt_12thGrade, data.grade_12th, "12th Grade");
        }
        await Actions.selectDropdown(this.ddl_12thBoard, data.board_12th, "12th Board");
        await Actions.fill(this.txt_12thRollNo, data.roll_no_12th, "12th Roll No");

        await Actions.addScreenshot(this.page, "Education Details Section");
    }

    // Select Couselling Course
    async select12thCourse(course: string) {
        const subject = course.toLowerCase();
        if (subject === "art")
            await Actions.selectDropdown(this.ddl_SubjectGroup, 'A', "Art Subject");
        else if (subject === 'maths')
            await Actions.selectDropdown(this.ddl_SubjectGroup, 'M', "Maths Subject");
        else
            await Actions.selectDropdown(this.ddl_SubjectGroup, 'O', "Other Subject");
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



    async validateEducationFields(data: Record<string, DEDValDataWOScenario>) {

        //--------Tenth - Year---------
        await this.compareAlertError('tenth_year', data);
        await Actions.fill(this.txt_10thPassYear, data['tenth_year'].valid_input, "10th Pass Year");

        //-------- Tenth - Result Type---------
        await this.compareAlertError('tenth_result_type', data);
        await Actions.selectDropdown(this.ddl_10thGradPer, data['tenth_result_type'].valid_input, "10th Result Type: Percentage");

        //-------- Tenth Obtain Marks----------
        await this.compareAlertError('tenth_obtain', data);
        await Actions.fill(this.txt_10thObtMarks, data['tenth_obtain'].valid_input, "10th Obtained Marks");

        //-------- Tenth Total Marks----------
        await this.compareAlertError('tenth_total', data);
        await Actions.fill(this.txt_10thOutOf, data['tenth_total'].valid_input, "10th Out Of Marks");

        //-------- Tenth Board---------
        await this.compareAlertError('tenth_board', data);
        await Actions.selectDropdown(this.ddl_10thBoard, data['tenth_board'].valid_input, "10th Board");

        //-------- Tenth Roll NO ----------
        await this.compareAlertError('tenth_rollno', data);
        await Actions.fill(this.txt_10thRollNo, data['tenth_rollno'].valid_input, "10th Roll No");

        //-------- 12th Subject----------
        await this.compareAlertError('twelth_subject', data);
        await Actions.selectDropdown(this.ddl_SubjectGroup, data['twelth_subject'].valid_input, "12th Subject");

        //--------12th Year---------
        await this.compareAlertError('twelth_year', data);
        await Actions.fill(this.txt_12thPassYear, data['twelth_year'].valid_input, "12th Pass Year");

        //-------- 12th Result Type---------
        await this.compareAlertError('twelth_result_type', data);
        await Actions.selectDropdown(this.ddl_12thGradPer, data['twelth_result_type'].valid_input, "12th Result Type:Percentage");

        //-------- 12th Obtain Marks----------
        await this.compareAlertError('twelth_obtain', data);
        await Actions.fill(this.txt_12thObtMarks, data['twelth_obtain'].valid_input, "12th Obtained Marks");

        //-------- 12th Total Marks----------
        await this.compareAlertError('twelth_total', data);
        await Actions.fill(this.txt_12thOutOf, data['twelth_total'].valid_input, "12th Out Of Marks");

        //-------- 12th Board---------
        await this.compareAlertError('twelth_board', data);
        await Actions.selectDropdown(this.ddl_12thBoard, data['twelth_board'].valid_input, "12th Board");

        //-------- 12th Roll NO ----------
        await this.compareAlertError('twelth_rollno', data);
        await Actions.fill(this.txt_12thRollNo, data['twelth_rollno'].valid_input, "12th Roll No");
    }
}


