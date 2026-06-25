import { test } from "../rsk-modules/PSY/PSYFixture";
import { Helper } from "../rsk-modules/PSY/PSYHelper";
import { PSYFormInputData } from "../rsk-modules/PSY/PSYTypes";
import { TestData } from "../reusable-component/utility/TestDataUtility";

test.describe("RSK(PSY) Module E2E - @psy @regression", () => {
  const testData = TestData.getData<PSYFormInputData>('PSYFormInputData');
  for (const data of testData) {
    if (data.run !== "Yes")
      continue;

    // Test Initiated for each Excel Row
    test(`${data.test_id} - ${data.test_desc} `, async ({ page, report, pages }) => {
      //Pre Data Processing 
      await Helper.refineInputTestData(data);
      await Helper.prepareInitialReport(report, data);

      //Step 1
      await test.step('New Form : Navigate to RSK-PSY Registration Form', async () => {
        await Helper.navigateToRegistrationForm(page, pages);
      });
      //Step 2
      await test.step('New Form : fill New Application Form', async () => {
        await Helper.fillCompleteForm(page, pages, data, report);
      });
      //Step 3
      await test.step('New Form : Upload Required Documents', async () => {
        await Helper.uploadRequiredDocuments(pages, data);
      });
      //Step 4
      await test.step('New Form : Complete Payment Process', async () => {
        await Helper.completePaymentProcess(pages, data, report);
      });
      //Step 5
      await test.step('New Form : Validate Payment Receipt', async () => {
        await Helper.validatePaymentReceipt(pages, data, report);
      });
      if (data.scenario !== 'REGISTRATION') {
        //Step 6
        await test.step(`Validate Other Feature : ${data.scenario}`, async () => {
          await Helper.validateOtherFeatures(page, pages, data, report);
        });
      }
      //await page.pause();
    });
  }
});