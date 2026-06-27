import { test } from "../rsk-modules/DED/DEDFixture";
import { Helper } from "../rsk-modules/DED/DEDHelper";

test(`RSK(DED) Verify Input validations: @ded`, async ({ page, pages, dataMap }) => {
  //Step 1
  await test.step('New Form : Navigate to Application Form', async () => {
    await Helper.navigateToRegistrationForm(page, pages);
  });
  //Step 2
  await test.step('Validate Input Fields', async () => {
    await Helper.performFieldValidation(pages, dataMap);
  });
  //await page.pause();
});

test(`RSK(DED) Verify Navigation: @ded @demo`, async ({ page, pages, dataMap }) => {
  //Step 1
  await test.step('New Form : Navigate to Application Form', async () => {
    await Helper.navigateToRegistrationForm(page, pages);
  });
  //await page.pause();
});
