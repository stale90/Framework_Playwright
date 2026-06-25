import { Page } from '@playwright/test'
import { Actions } from "../../../reusable-component/utility/ActionUtility";
import { PSYFormInputData, PSYValDataWOScenario } from "../PSYTypes";
import { PSYEducationLocator } from '../locator/PSYEducationLocator';
import { Logger } from '../../../reusable-component/config/LoggerSetup';

export class PSYEducationPage extends PSYEducationLocator {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    // Fill Address Details on RSK Form
    async fillEducationDetails(data: PSYFormInputData) {

        // ✅ 10th Details
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
        await Actions.selectDropdown(this.ddl_SubjectGroup, data.subject_12th, "12th Subject");
        await Actions.fill(this.txt_12thPassYear, data.year_12th, "12th Pass Year");

        if (data.result_type_12th === "P") {
            Logger.info("Inside : 12th result type - percentage")
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

        // ✅ Graduation Details
        let defaultIndex = 1;
        //await Actions.selectDropdown(this.ddl_GradDegree, data.degree_name, "Degree Name");
        await Actions.selectDropdownByIndex(this.ddl_GradDegree, defaultIndex, "Degree index : 1");
        await Actions.fill(this.txt_GradPassYear, data.degree_year, "Degree Year");
        await Actions.fill(this.txt_GradPercent, data.degree_percentage, "Degree Percentage");
        await Actions.fill(this.txt_GradUniversity, data.degree_board, "Degree University");
        await Actions.fill(this.txt_GradRollNo, data.degree_roll_no, "Degree Roll No");
        await Actions.addScreenshot(this.page, "Education Details Section");
    }

    // Select Couselling Course
    async selectCousellingCourse(data: PSYFormInputData) {
        if (data.course_applied_for === "PG")
            await Actions.checkCheckbox(this.rdo_PGPsy, "PG Deploma Radio Button");
        else
            await Actions.checkCheckbox(this.rdo_MAPsy, "M.A. Psychology Radio Button");
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



    async validateEducationFields(data: Record<string, PSYValDataWOScenario>) {
        //--------Applied Course----------
        await this.compareAlertError('applied_course', data);
        await Actions.checkCheckbox(this.rdo_PGPsy, "PG Deploma Radio Button");

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

        //-------- Graduation Name---------
        await this.compareAlertError('degree_name', data);
        await Actions.selectDropdownByIndex(this.ddl_GradDegree, 1, "Degree index : 1");

        //-------- Graduation Year ---------
        await this.compareAlertError('degree_year', data);
        await Actions.fill(this.txt_GradPassYear, data['degree_year'].valid_input, "Degree Year");

        //-------- Graduation Percentage ----------
        await this.compareAlertError('degree_percent', data);
        await Actions.fill(this.txt_GradPercent, data['degree_percent'].valid_input, "Degree Percentage");

        //-------- Graduation Marks ----------
        await this.compareAlertError('degree_institure', data);
        await Actions.fill(this.txt_GradUniversity, data['degree_institure'].valid_input, "Degree University");

        //-------- Graduation Roll No ---------
        await this.compareAlertError('degree_rollno', data);
        await Actions.fill(this.txt_GradRollNo, data['degree_rollno'].valid_input, "Degree Roll No");
    }
}


