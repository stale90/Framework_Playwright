import { DEDAddressPage } from "./pages/DEDAddressPage";
import { DEDDomicilePage } from "./pages/DEDDomicilePage";
import { DEDEducationPage } from "./pages/DEDEducationPage";
import { DEDExperiencePage } from "./pages/DEDExperiencePage";
import { DEDMainFormPage } from "./pages/DEDMainFormPage";
import { DEDOtherFeaturePage } from "./pages/DEDOtherFeaturePage";
import { DEDPersonalPage } from "./pages/DEDPersonalPage";
import { DEDPreFormPage } from "./pages/DEDPreFormPage";
import { DEDReceiptPage } from "./pages/DEDReceiptPage";
import { DEDUploadDocumentPage } from "./pages/DEDUploadDocumentPage";

// Pages Type
export type Pages = {
  mainForm: DEDMainFormPage;
  preForm: DEDPreFormPage;
  personal: DEDPersonalPage;
  domicile: DEDDomicilePage;
  experience: DEDExperiencePage;
  education: DEDEducationPage;
  address: DEDAddressPage;
  upload: DEDUploadDocumentPage;
  receipt: DEDReceiptPage;
  otherFeature: DEDOtherFeaturePage;
}

export interface DEDFormInputData {
  // Test Configuration
  run: string;
  test_id: string;
  test_desc: string;
  test_tag: string;
  test_comment: string;
  scenario: string;
  edit_case: string;
  // Payment consent
  consent_status: string;
  application_fee: string;
  payment_status: string;
  // Personal details
  first_name: string;
  middle_name: string;
  last_name: string;
  gender_status: string;
  father_name: string;
  mother_name: string;
  dob: string;
  religion: string;
  //Domicile details
  domicile_state: string;
  domicile_certificate: string;
  dom_no: string;
  dom_date: string;
  dom_place: string;
  dom_designation: string;
  dom_other_designation: string;
  category: string;
  cast_certificate_no: string;
  cast_issue_date: string;
  cast_cert_place: string;
  cast_cert_designation: string;
  family_income: string;
  is_ex_sainik: string;
  is_disability_40per: string;
  disability_type: string;
  //Expereince details
  is_gov_teacher: string;
  school_name: string;
  admission_date: string;
  work_district: string;
  school_dice_no: string;
  //Education details
  year_10th: string;
  result_type_10th: string;
  obtain_marks_10th: string;
  outof_marks_10th: string;
  percent_10th: string;
  grade_10th: string;
  board_10th: string;
  roll_no_10th: string;
  subject_12th: string;
  year_12th: string;
  result_type_12th: string;
  obtain_marks_12th: string;
  outof_marks_12th: string;
  percent_12th: string;
  grade_12th: string;
  board_12th: string;
  roll_no_12th: string;
  //Address details
  house_no: string;
  landmark: string;
  city_name: string;
  state_name: string;
  district_name: string;
  tehsil_name: string;
  mobile_no: string;
  email_id: string;
  pincode: string;
  // Upload document details
  upload_photo: string;
  upload_10th_cert: string;
  upload_12th_cert: string;
  upload_dom_cert: string;
  upload_cast_cert: string;
  upload_income_cert: string;
  upload_ews_cert: string;
}			

export interface DEDFormReport {
  test_id: string;
  test_desc: string;
  scenario: string;
  name: string;
  mobile_no: string;
  email: string;
  dob: string;
  application_id: string;
  reference_id_1:string;
  reference_id_2: string;
  password:string;
  application_fee: string;
  pay_status: string;
  transaction_id_1: string;
  transaction_id_2: string;
  test_status: string;
}

export interface DEDFormValidationData{
  test_id: string;
  test_desc: string; 
  test_comment: string;
  scenario:string;
  valid_input: string;
  expected_error_message: string;
  actual_error_message: string;
  test_status:string;
}

export interface DEDFormValidationReport{
  test_id: string;
  test_desc: string;
  test_comment: string;
  scenario:string;
  valid_input: string;
  expected_error_message: string;
  actual_error_message: string;
  test_status:string;
}

export interface DEDValDataWOScenario {
  test_id: string;
  test_desc: string;
  test_comment: string;
  valid_input: string;
  expected_error_message: string;
  actual_error_message: string;
  test_status: string;
}

