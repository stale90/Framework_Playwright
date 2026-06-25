import test, { Page } from "@playwright/test";
import { Actions } from "../../reusable-component/utility/ActionUtility";
import { DEDFormReport, DEDFormInputData,Pages, DEDValDataWOScenario } from "./DEDTypes";
import { TestData } from "../../reusable-component/utility/TestDataUtility";
import { GlobalConfig } from "../../reusable-component/config/PlaywrightSetup";


export class Helper {

  // Navigate to Web URL
  static async launchApplication(
    page: Page,
    url: string
  ) {
    await Actions.navigateTo(page, url);
  }

  // Refine Test Data with unique rollno, mobileno and email id
  static async refineInputDataDED(
    data: DEDFormInputData
  ) {
    data.roll_no_10th = await TestData.getUnique10thRollNumber();
    data.roll_no_12th = await TestData.getUnique12thRollNumber();
    data.mobile_no = await TestData.getUniqueMobileNumber();
    data.email_id = await TestData.getUniqueEmailID();
    if (data.scenario === 'PAY_UNPAID')
      data.payment_status = 'fail';
    if (data.scenario === 'EDIT_PAID')
      data.payment_status = 'first';
  }

  // Prepare Initial Report data
  static async initialReportDED(
    report: DEDFormReport,
    data: DEDFormInputData
  ) {
    report.test_id = data.test_id;
    report.test_desc = data.test_desc;
    report.scenario = data.scenario;
    report.name = data.first_name + " " + data.last_name;
    report.mobile_no = data.mobile_no;
    report.email = data.email_id;
    report.dob = data.dob;
    if (data.scenario !== 'EDIT_PAID')
      report.transaction_id_1 = 'NA';
    if (data.scenario !== 'EDIT_PAID')
      report.reference_id_1 = 'NA';
  }

  // Navigate to Web URL
  static async navigateToRegistrationForm(
    page: Page,
    pages: Pages
  ) {
    await Helper.launchApplication(page, GlobalConfig.TEST_URL);
    await pages.preForm.navigateToForm();
  }

  // Navigate to Web URL
  static async fillCompleteForm(
    page: Page,
    pages: Pages,
    data: DEDFormInputData,
    report: DEDFormReport
  ) {
    await test.step(`New Form : Fill Personal Details`, async () => {
      await pages.personal.fillPersonalDetails(data);
    });

    await test.step(`New Form : Fill Domicile Details`, async () => {
      await pages.domicile.fillDomicileDetails(data);
    });

    await test.step(`New Form : Fill Experience Details`, async () => {
      await pages.experience.fillExperienceDetails(data);
    });

    await test.step(`New Form : Fill Education Details`, async () => {
      await pages.education.fillEducationDetails(data);
    });

    await test.step(`New Form : Fill Address Details`, async () => {
      await pages.address.fillAddressDetails(data);
    });

    await test.step(`New Form : Upload Photo Details`, async () => {
      await pages.upload.uploadPhoto(data);
    });

    await test.step(`New Form : Proceed to Save & Next`, async () => {
      await pages.mainForm.checkUserConsent(data);
      //await page.pause();
      report.application_id = await pages.mainForm.saveAndGetAppID();
    });
  }

  static async uploadRequiredDocuments(
    pages: Pages,
    data: DEDFormInputData
  ) {
    await test.step(`New Form : Upload Document and Submit`, async () => {
      await pages.upload.uploadAllDocuments(data);
    });
  }

  static async completePaymentProcess(
    pages: Pages,
    data: DEDFormInputData,
    report: DEDFormReport
  ) {
    await test.step(`New Form : Click Validate Form and Get Verification Code`, async () => {
      const verificationCode = await pages.mainForm.validateFormAndGetCode();
      await pages.mainForm.proceedForPayment(verificationCode.code);
    });
    await test.step(`New Form : Verify Payment Details & Complete Payment`, async () => {
      await pages.mainForm.verifyPaymentDetails(data, report);
    });
  }

  static async validatePaymentReceipt(
    pages: Pages,
    data: DEDFormInputData,
    report: DEDFormReport
  ) {
    await test.step(`Application Receipt : Verify Receipt data`, async () => {
      if (report.pay_status === 'Yes') {
        await pages.receipt.getReceiptTransactionID(data, report);
        await pages.receipt.verifyPaymentReceiptData(data, report);
      } else {
        await Actions.addStepMessage('No Application Receipt as Payment Status : Failed');
      }
    });
  }

  static async performFieldValidation(
    pages: Pages,
    dataMap: Record<string, DEDValDataWOScenario>
  ) {
    await test.step(`Input Validation : Personal Info Section`, async () => {
      await pages.personal.personalFieldValidation(dataMap);
    });
    await test.step(`Input Validation : Domicile Info Section`, async () => {
      await pages.domicile.validateDomicileFields(dataMap);
    });
    await test.step(`Input Validation : Experience Info Section`, async () => {
      await pages.experience.validateExperienceFields(dataMap);
    });
    await test.step(`Input Validation : Education Info Section`, async () => {
      await pages.education.validateEducationFields(dataMap);
    });
    await test.step(`Input Validation : Address Info Section`, async () => {
      await pages.address.validateAddressFields(dataMap);
    });
  }

  static async validateOtherFeatures(
    page: Page,
    pages: Pages,
    data: DEDFormInputData,
    report: DEDFormReport
  ) {
    switch (data.scenario.toUpperCase()) {
      case 'REGISTRATION':
        await test.step('Payment Receipt already validated', async () => {
          // No action Required.
        });
        break;
      case 'DUPLICATE_RECEIPT':
        await test.step('Verify Duplicate/Reprint Receipt', async () => {
          await Helper.verifyDuplicateReceipt(page, pages, data, report);
        });
        break;
      case 'RESET_PASSWORD':
        await test.step('Reset Profile Password', async () => {
          await Helper.verifyResetPassword(page, pages, data, report);
        });
        break;
      case 'PAY_UNPAID':
        await test.step('Verify payment for unpaid registration', async () => {
          data.payment_status = 'success';
          await Helper.verifyPayUnpaid(page, pages, data, report);
        });
        break;
      case 'EDIT_PAID':
        await test.step('Generate User Password', async () => {
          await Helper.verifyResetPassword(page, pages, data, report);
        });
        await test.step('Verify edit registration form', async () => {
          data.payment_status = 'second';
          await Helper.verifyEditpaid(page, pages, data, report);
        });
        break;
      case 'REGISTRATION_CANCEL':
        await test.step('Generate User Password', async () => {
          await Helper.verifyResetPassword(page, pages, data, report);
        });
        await test.step('Verify Registration Cancellation', async () => {
          await Helper.verifyRegisterationCancel(page, pages, data, report);
        });
        break;
      default:
        throw new Error("Framework Exception occurs");
    }
  }

  static async verifyDuplicateReceipt(
    page: Page,
    pages: Pages,
    data: DEDFormInputData,
    report: DEDFormReport
  ) {
    await Helper.launchApplication(page, GlobalConfig.TEST_URL);
    await pages.preForm.navigateToDuplicateReceipt();
    await pages.otherFeature.fillDuplicateReceiptform(report);
    await pages.receipt.verifyPaymentReceiptData(data, report);
  }

  static async verifyResetPassword(
    page: Page,
    pages: Pages,
    data: DEDFormInputData,
    report: DEDFormReport
  ) {
    await Helper.launchApplication(page, GlobalConfig.TEST_URL);
    await pages.preForm.navigateToResetPassword();
    await pages.otherFeature.resetPassword(report);
  }

  static async verifyPayUnpaid(
    page: Page,
    pages: Pages,
    data: DEDFormInputData,
    report: DEDFormReport
  ) {
    await Helper.launchApplication(page, GlobalConfig.TEST_URL);
    await pages.preForm.navigateToPayUnpaid();
    await pages.otherFeature.fillPayUnpaidform(report);
    await pages.mainForm.checkUserConsent(data);
    await page.pause();
    await pages.mainForm.saveChanges();
    await Helper.completePaymentProcess(pages, data, report);
    await Helper.validatePaymentReceipt(pages, data, report);
  }

  static async verifyRegisterationCancel(
    page: Page,
    pages: Pages,
    data: DEDFormInputData,
    report: DEDFormReport
  ) {
    await Helper.launchApplication(page, GlobalConfig.TEST_URL);
    await pages.preForm.navigateToRegistrationCancel();
    await pages.otherFeature.fillRegisterationCancelForm(report, data);
  }

  static async verifyEditpaid(
    page: Page,
    pages: Pages,
    data: DEDFormInputData,
    report: DEDFormReport
  ) {
    await Helper.launchApplication(page, GlobalConfig.TEST_URL);
    await pages.preForm.navigateToEditPaidForm();
    await pages.otherFeature.fillEditAuthenticationForm(report);
    await Helper.EditRegistrationForm(pages, data);
    await pages.mainForm.checkUserConsent(data);
    //await page.pause();
    await pages.mainForm.saveChanges();
    await Helper.uploadRequiredDocuments(pages, data);
    await Helper.completePaymentProcess(pages, data, report);
    await Helper.validatePaymentReceipt(pages, data, report);
  }

  static async EditRegistrationForm(
    pages: Pages,
    data: DEDFormInputData
  ) {
    const editCase = data.edit_case.toUpperCase();
    switch (editCase) {
      case 'UR_TO_OBC':
        await TestData.DED_UR_To_OBC_Gov_Dom_PH(data);
        break;
      case 'UR_TO_EWS':
        await TestData.DED_UR_To_EWS_Dom_PH(data);
        break;
      case 'OBC_TO_UR':
        await TestData.DED_OBC_To_UR_Gov_Dom_PH(data);
        break;
      case 'OBC_TO_EWS':
        await TestData.DED_OBC_To_EWS_Gov_Dom_PH(data);
        break;
      case 'OBC_TO_UR_GN':
        await TestData.DED_OBC_Gov_PH_Dom_To_UR(data);
        break;

      default:
        throw new Error("Framework Exception occurs");
    }
    await test.step(`New Form : Fill Domicile Details`, async () => {
      await pages.domicile.fillDomicileDetails(data);
    });

    await test.step(`New Form : Fill Experience Details`, async () => {
      await pages.experience.fillExperienceDetails(data);
    });

    await test.step(`New Form : Fill Education Details`, async () => {
      await pages.education.fillEducationDetails(data);
    });

    await test.step(`New Form : Fill Address Details`, async () => {
      await pages.address.fillAddressDetails(data);
    });

    await test.step(`New Form : Upload Photo Details`, async () => {
      await pages.upload.uploadPhoto(data);
    });
  }
}