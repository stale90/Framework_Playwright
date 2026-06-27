import { test } from "../rsk-modules/PSY/PSYFixture";
import { Helper } from "../rsk-modules/PSY/PSYHelper";

test(`RSK(PSY) Verify Input validations: @psy`, async ({ page, pages, dataMap }) => {
  
  // Step 1
  await test.step('New Form : Navigate to Application Form', async () => {
    await Helper.navigateToRegistrationForm(page, pages);
  });
  // Step 2
  await test.step('Validate Input Fields', async () => {
    await Helper.performFieldValidation(pages, dataMap);
  });

});
