import { DEDFormInputData } from "../../test-scripts/rsk-modules/DED/DEDTypes";
import { PSYFormInputData } from "../../test-scripts/rsk-modules/PSY/PSYTypes";
import { Logger } from "../config/LoggerSetup";
import { GlobalConfig } from "../config/PlaywrightSetup";
import { ExcelUtility } from "./ExcelUtility";
import { Utility } from "./GeneralUtility";

export class TestData {

  static getData<T>(sheetName: string): T[] {
    return ExcelUtility.readExcelSheetData<T>(GlobalConfig.TEST_DATA_LOCATION, sheetName);
  }

  static convertDataToRecord< T extends Record<K, string>,K extends keyof T>(
    data: T[],
    key: K
  ): Record<T[K], Omit<T, K>> {
    const result = {} as Record<T[K], Omit<T, K>>;

    for (const item of data) {
      const { [key]: recordKey, ...rest } = item;
      result[recordKey] = rest;
    }
    return result;
  }

  // Get Unique 10th Roll No.
  static async getUnique10thRollNumber() {
    const rollNo = Utility.getRandom7DigitNumber().toString();
    Logger.info('10th Roll Number :' + rollNo);
    return rollNo;
  }

  // Get Unique 12th Roll No.
  static async getUnique12thRollNumber() {
    const rollNo = Utility.getRandom6DigitNumber().toString();
    Logger.info('12th Roll Number :' + rollNo);
    return rollNo;
  }

  // Get Unique UG Roll No.
  static async getUniqueUGRollNumber() {
    const rollNo = Utility.getRandom5DigitNumber().toString();
    Logger.info('UG Roll Number :' + rollNo);
    return rollNo;
  }

  // Get Unique Mobile Number 10 digit
  static async getUniqueMobileNumber() {
    const mobileNo = Utility.getRandom10DigitMobileNumber().toString();
    Logger.info('Unique Mobile Number :' + mobileNo);
    return mobileNo;
  }

  // Get Unique Email ID
  static async getUniqueEmailID() {
    const emailID = Utility.getRandomEmailID();
    Logger.info('Unique Email ID :' + emailID);
    return emailID;
  }

  static async PSY_UR_To_OBC_Gov_Dom_PH(data: PSYFormInputData) {
    //General
    data.application_fee = '50';
    // personal
    // Domicile
    data.domicile_state = 'Madhya Pradesh';
    data.domicile_certificate = 'Yes';
    data.dom_no = '33333';
    data.dom_date = '02/03/2004';
    data.dom_place = 'Bhopal';
    data.dom_designation = 'Nayab Tehsildar';
    data.dom_other_designation = 'Panchayat';
    //Category
    data.category = 'OBC';
    data.cast_certificate_no = '565656';
    data.cast_issue_date = '02/03/2004';
    data.cast_cert_place = 'Indore';
    data.cast_cert_designation = 'Sub Divisional Officer';
    data.is_ex_sainik = 'No';
            data.is_ex_freedom_fighter = 'No';
    data.is_disability_40per = 'Yes';
    data.disability_type = 'DH';
    // Expereince
    data.is_gov_teacher = 'Yes';
            data.vibhag_name = 'SCHOOL SHIKSHA VIBHAG';
            data.designation_name = 'Head Teacher';
    data.school_name = 'Gram vidyalaya';
    data.admission_date = '02/11/2019';
    data.work_district = 'Alirajpur';
    data.school_dice_no = '12345678902';
    // education
            data.course_applied_for = 'PG';
    // 10th
    data.year_10th = '2015';
    data.result_type_10th = 'P';
    data.obtain_marks_10th = '480';
    data.outof_marks_10th = '500';
    data.percent_10th = 'NA';
    data.grade_10th = 'NA';
    data.board_10th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    //12 th
    data.subject_12th = 'कला संकाय';
    data.year_12th = '2017';
    data.result_type_12th = 'P';
    data.obtain_marks_12th = '700';
    data.outof_marks_12th = '800';
    data.percent_12th = '';
    data.grade_12th = '';
    data.board_12th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    data.degree_name = 'M.A. (PSYCHOLOGY)';
    data.degree_year = '2022';
    data.degree_percentage = '65';
    data.degree_board = 'RGPV University';
    // address
    data.house_no = '440';
    data.landmark = 'MIG Colony';
    data.city_name = 'bhopal';
    data.state_name = 'Madhya Pradesh';
    data.district_name = 'Bhopal';
    data.tehsil_name = 'बैरसिया';
    //data.pincode = '462700';
    // upload
    data.upload_10th_cert = 'Yes';
    data.upload_12th_cert = 'Yes';
          data.upload_ug_cert = 'Yes';
          data.upload_pg_cert = 'Yes';
    data.upload_dom_cert = 'Yes';
    data.upload_cast_cert = 'Yes';
    data.upload_income_cert = 'Yes';
          data.upload_handi_cert = 'Yes';
    data.upload_ews_cert = 'No';
  }

  static async PSY_UR_To_EWS_Dom_PH(data: PSYFormInputData) {
    //General
    data.application_fee = '50';
    // personal
    // Domicile
    data.domicile_state = 'Madhya Pradesh';
    data.domicile_certificate = 'Yes';
    data.dom_no = '33333';
    data.dom_date = '02/03/2004';
    data.dom_place = 'Bhopal';
    data.dom_designation = 'Nayab Tehsildar';
    data.dom_other_designation = 'Panchayat';
    //Category
    data.category = 'EWS';

    data.is_ex_sainik = 'No';
    data.is_ex_freedom_fighter = 'No';
    data.is_disability_40per = 'Yes';
    data.disability_type = 'DH';
    // Expereince
    data.is_gov_teacher = 'No';

    // education
    data.course_applied_for = 'PG';
    // 10th
    data.year_10th = '2015';
    data.result_type_10th = 'P';
    data.obtain_marks_10th = '480';
    data.outof_marks_10th = '500';
    data.percent_10th = 'NA';
    data.grade_10th = 'NA';
    data.board_10th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    //12 th
    data.subject_12th = 'कला संकाय';
    data.year_12th = '2017';
    data.result_type_12th = 'P';
    data.obtain_marks_12th = '700';
    data.outof_marks_12th = '800';
    data.percent_12th = '';
    data.grade_12th = '';
    data.board_12th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    data.degree_name = 'M.A. (PSYCHOLOGY)';
    data.degree_year = '2022';
    data.degree_percentage = '65';
    data.degree_board = 'RGPV University';
    // address
    data.house_no = '440';
    data.landmark = 'MIG Colony';
    data.city_name = 'bhopal';
    data.state_name = 'Madhya Pradesh';
    data.district_name = 'Bhopal';
    data.tehsil_name = 'बैरसिया';
    //data.pincode = '462700';
    // upload
    data.upload_10th_cert = 'Yes';
    data.upload_12th_cert = 'Yes';
    data.upload_ug_cert = 'Yes';
    data.upload_pg_cert = 'Yes';
    data.upload_dom_cert = 'Yes';
    data.upload_cast_cert = 'No';
    data.upload_income_cert = 'No';
    data.upload_handi_cert = 'Yes';
    data.upload_ews_cert = 'Yes';
  }

  static async PSY_OBC_To_UR_Gov_Dom_PH(data: PSYFormInputData) {
    //General
    data.application_fee = '50';
    // personal
    // Domicile
    data.domicile_state = 'Madhya Pradesh';
    data.domicile_certificate = 'Yes';
    data.dom_no = '33333';
    data.dom_date = '02/03/2004';
    data.dom_place = 'Bhopal';
    data.dom_designation = 'Nayab Tehsildar';
    data.dom_other_designation = 'Panchayat';
    //Category
    data.category = 'UR';
    data.is_ex_sainik = 'No';
    data.is_ex_freedom_fighter = 'No';
    data.is_disability_40per = 'Yes';
    data.disability_type = 'DH';
    // Expereince
    data.is_gov_teacher = 'Yes';
    data.vibhag_name = 'SCHOOL SHIKSHA VIBHAG';
    data.designation_name = 'Head Teacher';
    data.school_name = 'Gram vidyalaya';
    data.admission_date = '02/11/2019';
    data.work_district = 'Alirajpur';
    data.school_dice_no = '12345678902';
    // education
    data.course_applied_for = 'PG';
    // 10th
    data.year_10th = '2015';
    data.result_type_10th = 'P';
    data.obtain_marks_10th = '480';
    data.outof_marks_10th = '500';
    data.percent_10th = 'NA';
    data.grade_10th = 'NA';
    data.board_10th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    //12 th
    data.subject_12th = 'कला संकाय';
    data.year_12th = '2017';
    data.result_type_12th = 'P';
    data.obtain_marks_12th = '700';
    data.outof_marks_12th = '800';
    data.percent_12th = '';
    data.grade_12th = '';
    data.board_12th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    data.degree_name = 'M.A. (PSYCHOLOGY)';
    data.degree_year = '2022';
    data.degree_percentage = '65';
    data.degree_board = 'RGPV University';
    // address
    data.house_no = '440';
    data.landmark = 'MIG Colony';
    data.city_name = 'bhopal';
    data.state_name = 'Madhya Pradesh';
    data.district_name = 'Bhopal';
    data.tehsil_name = 'बैरसिया';
    //data.pincode = '462700';
    // upload
    data.upload_10th_cert = 'Yes';
    data.upload_12th_cert = 'Yes';
    data.upload_ug_cert = 'Yes';
    data.upload_pg_cert = 'Yes';
    data.upload_dom_cert = 'Yes';
    data.upload_cast_cert = 'No';
    data.upload_income_cert = 'No';
    data.upload_handi_cert = 'Yes';
    data.upload_ews_cert = 'No';
  }

  static async PSY_OBC_To_EWS_Gov_Dom_PH(data: PSYFormInputData) {
    //General
    data.application_fee = '50';
    // personal
    // Domicile
    data.domicile_state = 'Madhya Pradesh';
    data.domicile_certificate = 'Yes';
    data.dom_no = '33333';
    data.dom_date = '02/03/2004';
    data.dom_place = 'Bhopal';
    data.dom_designation = 'Nayab Tehsildar';
    data.dom_other_designation = 'Panchayat';
    //Category
    data.category = 'EWS';
    data.is_ex_sainik = 'No';
    data.is_ex_freedom_fighter = 'No';
    data.is_disability_40per = 'Yes';
    data.disability_type = 'DH';
    // Expereince
    data.is_gov_teacher = 'Yes';
    data.vibhag_name = 'SCHOOL SHIKSHA VIBHAG';
    data.designation_name = 'Head Teacher';
    data.school_name = 'Gram vidyalaya';
    data.admission_date = '02/11/2019';
    data.work_district = 'Alirajpur';
    data.school_dice_no = '12345678902';
    // education
    data.course_applied_for = 'PG';
    // 10th
    data.year_10th = '2015';
    data.result_type_10th = 'P';
    data.obtain_marks_10th = '480';
    data.outof_marks_10th = '500';
    data.percent_10th = 'NA';
    data.grade_10th = 'NA';
    data.board_10th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    //12 th
    data.subject_12th = 'कला संकाय';
    data.year_12th = '2017';
    data.result_type_12th = 'P';
    data.obtain_marks_12th = '700';
    data.outof_marks_12th = '800';
    data.percent_12th = '';
    data.grade_12th = '';
    data.board_12th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    data.degree_name = 'M.A. (PSYCHOLOGY)';
    data.degree_year = '2022';
    data.degree_percentage = '65';
    data.degree_board = 'RGPV University';
    // address
    data.house_no = '440';
    data.landmark = 'MIG Colony';
    data.city_name = 'bhopal';
    data.state_name = 'Madhya Pradesh';
    data.district_name = 'Bhopal';
    data.tehsil_name = 'बैरसिया';
    //data.pincode = '462700';
    // upload
    data.upload_10th_cert = 'Yes';
    data.upload_12th_cert = 'Yes';
    data.upload_ug_cert = 'Yes';
    data.upload_pg_cert = 'Yes';
    data.upload_dom_cert = 'Yes';
    data.upload_cast_cert = 'No';
    data.upload_income_cert = 'No';
    data.upload_handi_cert = 'Yes';
    data.upload_ews_cert = 'Yes';
  }

  static async PSY_OBC_Gov_PH_Dom_To_UR(data: PSYFormInputData) {
    //General
    data.application_fee = '50';
    // personal
    // Domicile
    data.domicile_state = 'Madhya Pradesh';
    data.domicile_certificate = 'No';
    //Category
    data.category = 'UR';
    data.is_ex_sainik = 'No';
    data.is_ex_freedom_fighter = 'No';
    data.is_disability_40per = 'No';
    // Expereince
    data.is_gov_teacher = 'No';
    // education
    data.course_applied_for = 'PG';
    // 10th
    data.year_10th = '2015';
    data.result_type_10th = 'P';
    data.obtain_marks_10th = '480';
    data.outof_marks_10th = '500';
    data.percent_10th = 'NA';
    data.grade_10th = 'NA';
    data.board_10th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    //12 th
    data.subject_12th = 'कला संकाय';
    data.year_12th = '2017';
    data.result_type_12th = 'P';
    data.obtain_marks_12th = '700';
    data.outof_marks_12th = '800';
    data.percent_12th = '';
    data.grade_12th = '';
    data.board_12th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    data.degree_name = 'M.A. (PSYCHOLOGY)';
    data.degree_year = '2022';
    data.degree_percentage = '65';
    data.degree_board = 'RGPV University';
    // address
    data.house_no = '440';
    data.landmark = 'MIG Colony';
    data.city_name = 'bhopal';
    data.state_name = 'Madhya Pradesh';
    data.district_name = 'Bhopal';
    data.tehsil_name = 'बैरसिया';
    //data.pincode = '462700';
    // upload
    data.upload_10th_cert = 'No';
    data.upload_12th_cert = 'No';
    data.upload_ug_cert = 'No';
    data.upload_pg_cert = 'No';
    data.upload_dom_cert = 'No';
    data.upload_cast_cert = 'No';
    data.upload_income_cert = 'No';
    data.upload_handi_cert = 'No';
    data.upload_ews_cert = 'No';
  }

  static async DED_UR_To_OBC_Gov_Dom_PH(data: DEDFormInputData) {
    //General
    data.application_fee = '50';
    // personal
    // Domicile
    data.domicile_state = 'Madhya Pradesh';
    data.domicile_certificate = 'Yes';
    data.dom_no = '33333';
    data.dom_date = '02/03/2004';
    data.dom_place = 'Bhopal';
    data.dom_designation = 'Nayab Tehsildar';
    data.dom_other_designation = 'Panchayat';
    data.family_income = '600000';
    //Category
    data.category = 'OBC';
    data.cast_certificate_no = '565656';
    data.cast_issue_date = '02/03/2004';
    data.cast_cert_place = 'Indore';
    data.cast_cert_designation = 'Sub Divisional Officer';
    data.is_ex_sainik = 'No';
    data.is_disability_40per = 'Yes';
    data.disability_type = 'DH';
    // Expereince
    data.is_gov_teacher = 'Yes';
    data.school_name = 'Gram vidyalaya';
    data.admission_date = '02/11/2019';
    data.work_district = 'Alirajpur';
    data.school_dice_no = '12345678902';
    // education
    data.year_10th = '2015';
    data.result_type_10th = 'P';
    data.obtain_marks_10th = '480';
    data.outof_marks_10th = '500';
    data.percent_10th = 'NA';
    data.grade_10th = 'NA';
    data.board_10th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    //12 th
    data.subject_12th = 'कला संकाय';
    data.year_12th = '2017';
    data.result_type_12th = 'P';
    data.obtain_marks_12th = '700';
    data.outof_marks_12th = '800';
    data.percent_12th = '';
    data.grade_12th = '';
    data.board_12th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    // address
    data.house_no = '440';
    data.landmark = 'MIG Colony';
    data.city_name = 'bhopal';
    data.state_name = 'Madhya Pradesh';
    data.district_name = 'Bhopal';
    data.tehsil_name = 'बैरसिया';
    //data.pincode = '462700';
    // upload
    data.upload_10th_cert = 'Yes';
    data.upload_12th_cert = 'Yes';
    data.upload_dom_cert = 'Yes';
    data.upload_cast_cert = 'Yes';
    data.upload_income_cert = 'Yes';
    data.upload_ews_cert = 'No';
  }

  static async DED_UR_To_EWS_Dom_PH(data: DEDFormInputData) {
    //General
    data.application_fee = '50';
    // personal
    // Domicile
    data.domicile_state = 'Madhya Pradesh';
    data.domicile_certificate = 'Yes';
    data.dom_no = '33333';
    data.dom_date = '02/03/2004';
    data.dom_place = 'Bhopal';
    data.dom_designation = 'Nayab Tehsildar';
    data.dom_other_designation = 'Panchayat';
    data.family_income = '600000';
    //Category
    data.category = 'EWS';
    data.is_ex_sainik = 'No';
    data.is_disability_40per = 'Yes';
    data.disability_type = 'DH';
    // Expereince
    data.is_gov_teacher = 'No';
    // education
    data.year_10th = '2015';
    data.result_type_10th = 'P';
    data.obtain_marks_10th = '480';
    data.outof_marks_10th = '500';
    data.percent_10th = 'NA';
    data.grade_10th = 'NA';
    data.board_10th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    //12 th
    data.subject_12th = 'कला संकाय';
    data.year_12th = '2017';
    data.result_type_12th = 'P';
    data.obtain_marks_12th = '700';
    data.outof_marks_12th = '800';
    data.percent_12th = '';
    data.grade_12th = '';
    data.board_12th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    // address
    data.house_no = '440';
    data.landmark = 'MIG Colony';
    data.city_name = 'bhopal';
    data.state_name = 'Madhya Pradesh';
    data.district_name = 'Bhopal';
    data.tehsil_name = 'बैरसिया';
    //data.pincode = '462700';
    // upload
    data.upload_10th_cert = 'Yes';
    data.upload_12th_cert = 'Yes';
    data.upload_dom_cert = 'Yes';
    data.upload_cast_cert = 'No';
    data.upload_income_cert = 'No';
    data.upload_ews_cert = 'Yes';
  }

  static async DED_OBC_To_UR_Gov_Dom_PH(data: DEDFormInputData) {
    //General
    data.application_fee = '50';
    // personal
    // Domicile
    data.domicile_state = 'Madhya Pradesh';
    data.domicile_certificate = 'Yes';
    data.dom_no = '33333';
    data.dom_date = '02/03/2004';
    data.dom_place = 'Bhopal';
    data.dom_designation = 'Nayab Tehsildar';
    data.dom_other_designation = 'Panchayat';
    //Category
    data.family_income = '600000';
    data.category = 'UR';
    data.is_ex_sainik = 'No';
    data.is_disability_40per = 'Yes';
    data.disability_type = 'DH';
    // Expereince
    data.is_gov_teacher = 'Yes';
    data.school_name = 'Gram vidyalaya';
    data.admission_date = '02/11/2019';
    data.work_district = 'Alirajpur';
    data.school_dice_no = '12345678902';
    // education
    data.year_10th = '2015';
    data.result_type_10th = 'P';
    data.obtain_marks_10th = '480';
    data.outof_marks_10th = '500';
    data.percent_10th = 'NA';
    data.grade_10th = 'NA';
    data.board_10th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    //12 th
    data.subject_12th = 'कला संकाय';
    data.year_12th = '2017';
    data.result_type_12th = 'P';
    data.obtain_marks_12th = '700';
    data.outof_marks_12th = '800';
    data.percent_12th = '';
    data.grade_12th = '';
    data.board_12th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    // address
    data.house_no = '440';
    data.landmark = 'MIG Colony';
    data.city_name = 'bhopal';
    data.state_name = 'Madhya Pradesh';
    data.district_name = 'Bhopal';
    data.tehsil_name = 'बैरसिया';
    //data.pincode = '462700';
    // upload
    data.upload_10th_cert = 'Yes';
    data.upload_12th_cert = 'Yes';
    data.upload_dom_cert = 'Yes';
    data.upload_cast_cert = 'No';
    data.upload_income_cert = 'No';
    data.upload_ews_cert = 'No';
  }

  static async DED_OBC_To_EWS_Gov_Dom_PH(data: DEDFormInputData) {
    //General
    data.application_fee = '50';
    // personal
    // Domicile
    data.domicile_state = 'Madhya Pradesh';
    data.domicile_certificate = 'Yes';
    data.dom_no = '33333';
    data.dom_date = '02/03/2004';
    data.dom_place = 'Bhopal';
    data.dom_designation = 'Nayab Tehsildar';
    data.dom_other_designation = 'Panchayat';
    data.family_income = '600000';
    //Category
    data.category = 'EWS';
    data.is_ex_sainik = 'No';
    data.is_disability_40per = 'Yes';
    data.disability_type = 'DH';
    // Expereince
    data.is_gov_teacher = 'Yes';
    data.school_name = 'Gram vidyalaya';
    data.admission_date = '02/11/2019';
    data.work_district = 'Alirajpur';
    data.school_dice_no = '12345678902';
    // education
    data.year_10th = '2015';
    data.result_type_10th = 'P';
    data.obtain_marks_10th = '480';
    data.outof_marks_10th = '500';
    data.percent_10th = 'NA';
    data.grade_10th = 'NA';
    data.board_10th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    //12 th
    data.subject_12th = 'कला संकाय';
    data.year_12th = '2017';
    data.result_type_12th = 'P';
    data.obtain_marks_12th = '700';
    data.outof_marks_12th = '800';
    data.percent_12th = '';
    data.grade_12th = '';
    data.board_12th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    // address
    data.house_no = '440';
    data.landmark = 'MIG Colony';
    data.city_name = 'bhopal';
    data.state_name = 'Madhya Pradesh';
    data.district_name = 'Bhopal';
    data.tehsil_name = 'बैरसिया';
    //data.pincode = '462700';
    // upload
    data.upload_10th_cert = 'Yes';
    data.upload_12th_cert = 'Yes';
    data.upload_dom_cert = 'Yes';
    data.upload_cast_cert = 'No';
    data.upload_income_cert = 'No';
    data.upload_ews_cert = 'Yes';
  }

  static async DED_OBC_Gov_PH_Dom_To_UR(data: DEDFormInputData) {
    //General
    data.application_fee = '50';
    // personal
    // Domicile
    data.domicile_state = 'Madhya Pradesh';
    data.domicile_certificate = 'No';
    data.family_income = '600000';
    //Category
    data.category = 'UR';
    data.is_ex_sainik = 'No';
    data.is_disability_40per = 'No';
    // Expereince
    data.is_gov_teacher = 'No';
    // education
    data.year_10th = '2015';
    data.result_type_10th = 'P';
    data.obtain_marks_10th = '480';
    data.outof_marks_10th = '500';
    data.percent_10th = 'NA';
    data.grade_10th = 'NA';
    data.board_10th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    //12 th
    data.subject_12th = 'कला संकाय';
    data.year_12th = '2017';
    data.result_type_12th = 'P';
    data.obtain_marks_12th = '700';
    data.outof_marks_12th = '800';
    data.percent_12th = '';
    data.grade_12th = '';
    data.board_12th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    // address
    data.house_no = '440';
    data.landmark = 'MIG Colony';
    data.city_name = 'bhopal';
    data.state_name = 'Madhya Pradesh';
    data.district_name = 'Bhopal';
    data.tehsil_name = 'बैरसिया';
    //data.pincode = '462700';
    // upload
    data.upload_10th_cert = 'No';
    data.upload_12th_cert = 'No';
    data.upload_dom_cert = 'No';
    data.upload_cast_cert = 'No';
    data.upload_income_cert = 'No';
    data.upload_ews_cert = 'No';
  }

  static async Sample_Data(data: any) {

    // General
    data.run = 'yes';
    data.test_id = 'Test-312';
    data.test_desc = 'Application- OBC+Gov+PH+Dom';
    data.test_tag = '@E2E';
    data.test_comment = 'OBC';
    data.scenario = 'REGISTRATION';
    data.edit_case = 'NA';
    data.application_fee = '50';
    data.payment_status = 'success';
    // personal
    data.first_name = 'Gautam';
    data.middle_name = '';
    data.last_name = 'Adani';
    data.gender_status = 'M';
    data.marital_status = 'No';
    data.widow_status = 'No';
    data.father_name = 'Saurabh Adani';
    data.mother_name = 'Pratibha Adani';
    data.dob = '02/02/2000';
    data.religion = 'Hindu';
    // domicile
    data.domicile_state = 'Madhya Pradesh';
    data.domicile_certificate = 'Yes';
    data.dom_no = '33333';
    data.dom_date = '02/03/2004';
    data.dom_place = 'Bhopal';
    data.dom_designation = 'Nayab Tehsildar';
    data.dom_other_designation = 'Panchayat';
    data.category = 'OBC';
    data.cast_certificate_no = '565656';
    data.cast_issue_date = '02/03/2004';
    data.cast_cert_place = 'Indore';
    data.cast_cert_designation = 'Sub Divisional Officer';
    data.is_ex_sainik = 'No';
    data.is_ex_freedom_fighter = 'No';
    data.is_disability_40per = 'Yes';
    data.disability_type = 'VH';
    // Expereince
    data.is_gov_teacher = 'Yes';
    data.vibhag_name = 'SCHOOL SHIKSHA VIBHAG';
    data.designation_name = 'Head Teacher';
    data.school_name = 'Gram vidyalaya';
    data.admission_date = '02/11/2017';
    data.work_district = 'Alirajpur';
    data.school_dice_no = '12345678902';
    // education
    data.course_applied_for = 'PG';
    data.year_10th = '2014';
    data.result_type_10th = 'P';
    data.obtain_marks_10th = '400';
    data.outof_marks_10th = '500';
    data.percent_10th = 'NA';
    data.grade_10th = 'NA';
    data.board_10th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    data.roll_no_10th = 'Auto';
    data.subject_12th = 'कला संकाय';
    data.year_12th = '2016';
    data.result_type_12th = 'P';
    data.obtain_marks_12th = '600';
    data.outof_marks_12th = '700';
    data.percent_12th = '';
    data.grade_12th = '';
    data.board_12th = 'Board of Secondary Education, Bhopal , Madhya Pradesh';
    data.roll_no_12th = 'Auto';
    data.degree_name = 'M.A. (PSYCHOLOGY)';
    data.degree_year = '2022';
    data.degree_percentage = '90';
    data.degree_board = 'RGPV University';
    data.degree_roll_no = 'Auto';
    // address
    data.house_no = '44';
    data.landmark = 'MIG Colony';
    data.city_name = 'bhopal';
    data.state_name = 'Madhya Pradesh';
    data.district_name = 'Bhopal';
    data.tehsil_name = 'बैरसिया';
    data.mobile_no = 'Auto';
    data.email_id = 'Auto';
    data.pincode = '462777';
    // upload
    data.upload_photo = 'Yes';
    data.upload_10th_cert = 'Yes';
    data.upload_12th_cert = 'Yes';
    data.upload_ug_cert = 'Yes';
    data.upload_pg_cert = 'Yes';
    data.upload_dom_cert = 'Yes';
    data.upload_cast_cert = 'Yes';
    data.upload_income_cert = 'Yes';
    data.upload_handi_cert = 'Yes';
    data.upload_ews_cert = 'No';
  }

}