import { Page, Locator, test as baseTest, expect, Dialog, BrowserContext } from '@playwright/test';
import { test } from '@playwright/test';
import { Logger } from '../config/LoggerSetup';
import { GlobalConfig } from '../config/PlaywrightSetup';
import * as fs from 'fs';

export class Actions {
  // **Page utility methods**


  // Navigation to URL

  static async navigateTo(
    page: Page,
    url: string
  ): Promise<void> {
    await test.step(`Navigate to: ${url}`, async () => {
      await page.goto(url, {
        waitUntil: 'load',
        timeout: GlobalConfig.TIMEOUT_NAVIGATION
      });
    });
  }

  // open New Tab with Url
  static async openNewPage(
    context: BrowserContext,
    url: string
  ) {
    await test.step(`Open New Tab with URL : ${url}`, async () => {
      const newPage = await context.newPage();
      await this.navigateTo(newPage, url);
    });
  }

  // Verify Current URL Contains 'text' 
  static async verifyUrlContains(
    page: Page,
    expectedText: string,
    desc: string,
    timeout: number = GlobalConfig.TIMEOUT_EXPECT
  ): Promise<void> {
    await test.step(
      `Verify ${desc} contains "${expectedText}" - ${desc}`,
      async () => {
        await expect(page).toHaveURL(new RegExp(expectedText), { timeout });
      }
    );
  }

  // Verify Current URL
  static async verifyCurrentUrl(
    page: Page,
    expectedUrl: string | RegExp,
    desc: string
  ): Promise<boolean> {
    let result = false;

    await test.step(`Verify URL "${desc}" as "${expectedUrl}"`, async () => {
      await expect(page).toHaveURL(expectedUrl);
      result = true;
    });
    return result;
  }

  // **Screenshot with Allure**
  static async addScreenshot(
    page: Page,
    desc: string
  ): Promise<void> {
    await test.step(`📸 Screenshot: ${desc}`, async () => {
      const screenshot = await page.screenshot({ fullPage: true });
      const testInfo = baseTest.info();

      await testInfo.attach(`${desc}.png`, {
        body: screenshot,
        contentType: 'image/png'
      });
    });
  }

  // Hard wait timeout in seconds
  static async hardWait(
    sec: number
  ): Promise<void> {
    const ms = sec * 1000;
    return await new Promise(resolve => setTimeout(resolve, ms));
  }

 // **Locator helper**
 private static getLocator(
    page: Page,
    selector: string | Locator
  ): Locator {
    return typeof selector === 'string'
      ? page.locator(selector)
      : selector;
  }

  // Verify Part Text Soft Assertion
  static async verifyPartText(
    element: Locator,
    expectedText: string,
    desc: string
  ): Promise<void> {
    await test.step(
      `Verify "${desc}" which contains: "${expectedText}"`,
      async () => {
        await expect.soft(element).toContainText(expectedText);
      }
    );
  }

  // Verify Full Text Soft Assertion
  static async verifyText(
    element: Locator,
    expectedText: string,
    desc: string
  ): Promise<void> {
    await test.step(
      `Verify "${desc}" with full text: "${expectedText}"`,
      async () => {
        await expect.soft(element).toHaveText(expectedText);
      }
    );
  }

  // Verify Full Text Hard Assertion
  static async verifyTextStrict(
    element: Locator,
    expectedText: string,
    desc: string
  ): Promise<void> {
    await test.step(
      `Verify "${desc}" with full text: "${expectedText}"`,
      async () => {
        await expect(element).toHaveText(expectedText);
      }
    );
  }

  // Verify Part Text Hard Assertion
  static async verifyPartTextStrict(
    element: Locator,
    expectedText: string,
    desc: string
  ): Promise<void> {
    await test.step(
      `Verify "${desc}" which contains: "${expectedText}"`,
      async () => {
        await expect(element).toContainText(expectedText);
      }
    );
  }

  // Verify Text with Ignoring Case Sensitiveness
  static async verifyTextIgnoreCase(
    element: Locator,
    expectedText: string,
    desc: string
  ): Promise<void> {
    await test.step(
      `Verify "${desc}" (case-insensitive) with text: "${expectedText}"`,
      async () => {
        const actualText = await element.textContent();
        expect.soft(actualText?.toLowerCase().trim()).toBe(
          expectedText.toLowerCase().trim()
        );
      }
    );
  }

  // Verify Part Text with Ignoring Case Sensitiveness
  static async verifyPartTextIgnoreCase(
    element: Locator,
    expectedText: string,
    desc: string
  ): Promise<void> {
    await test.step(
      `Verify "${desc}" (case-insensitive) with text: "${expectedText}"`,
      async () => {
        const actualText = await element.textContent();
        expect.soft(actualText?.toLowerCase()).toContain(
          expectedText.toLowerCase()
        );
      }
    );
  }

  // Verify Attribute to value assertion
  static async verifyAttributeValue(
    element: Locator,
    attributeName: string,
    attributeValue: string,
    desc: string
  ): Promise<void> {
    await test.step(
      `Verify "${desc}" attribute "${attributeName}": "${attributeValue}"`,
      async () => {
        await expect(element).toHaveAttribute(attributeName, attributeValue);
      }
    );
  }

  // **Actions**
  static async fill(
    element: Locator,
    value: string,
    desc: string
  ): Promise<void> {
    await test.step(`Fill "${desc}": "${value}"`, async () => {
      await expect(element).toBeVisible();
      await element.fill(value);
    });
  }

  static async typeInput(
    element: Locator,
    value: string,
    desc: string
  ): Promise<void> {
    await test.step(`Type into "${desc}": "${value}"`, async () => {
      await expect(element).toBeVisible();
      await element.type(value);
    });
  }

  static async clearInput(
    element: Locator,
    desc: string
  ): Promise<void> {
    await test.step(`Clear "${desc}"`, async () => {
      await expect(element).toBeVisible();
      await element.fill('');
    });
  }

  static async click(
    element: Locator,
    desc: string
  ): Promise<void> {
    await test.step(`Click "${desc}"`, async () => {
      await expect(element).toBeEnabled({
        timeout: GlobalConfig.TIMEOUT_ACTION
      });
      await element.click();
    });
  }

  static async clickOutside(
    page: Page
  ){
    await test.step(`Click Outside the Element`, async () => {
      await page.mouse.click(5, 5);
    });
  }

  static async doubleClick(
    element: Locator,
    desc: string
  ): Promise<void> {
    await test.step(`Double-click "${desc}"`, async () => {
      await expect(element).toBeVisible();
      await element.dblclick();
    });
  }

  static async rightClick(
    element: Locator,
    desc: string
  ): Promise<void> {
    await test.step(`Right-click "${desc}"`, async () => {
      await expect(element).toBeEnabled({
        timeout: GlobalConfig.TIMEOUT_EXPECT
      });
      await element.click({ button: 'right' });
    });
  }

  static async checkCheckbox(
    element: Locator,
    desc: string
  ): Promise<void> {
    await test.step(`Check "${desc}"`, async () => {
      await expect(element).toBeVisible();
      await element.check();
    });
  }

  static async uncheckCheckbox(
    element: Locator,
    desc: string
  ): Promise<void> {
    await test.step(`Uncheck "${desc}"`, async () => {
      await expect(element).toBeVisible();
      await element.uncheck();
    });
  }

  static async addStepMessage(
    msg: any
  ): Promise<void> {
    await test.step(`${msg}`, async () => {
      // External Message
    });
  }

static async selectDropdownWithWait(
    element: Locator,
    value: string | string[] | Record<string, any>,
    desc: string
  ): Promise<void> {
    await test.step(`Select "${value}" in "${desc}"`, async () => {
        await Actions.hardWait(8);
        await Actions.waitForVisible(element, desc);
        await element.selectOption(value);
    });
  }

  static async selectDropdown(
    element: Locator,
    value: string | string[] | Record<string, any>,
    desc: string
  ): Promise<void> {
    await test.step(`Select "${value}" in "${desc}"`, async () => {
      const attemptSelect = async () => {
        await Actions.waitForVisible(element, desc);
        await element.selectOption(value);
      };
      try {
        await attemptSelect();
      } 
      catch {
        await Actions.hardWait(5);
          try {
            await attemptSelect();
          } catch (retryError) {
            throw new Error(
              `Failed to select "${value}" in "${desc}" after retry. Error: ${retryError}`
            );
          }
        }
    });
  }

  static async selectDropdownByIndex(
    element: Locator,
    index: number,
    desc: string
  ): Promise<void> {
    await test.step(`Select index "${index}" in "${desc}"`, async () => {
      await expect(element).toBeVisible();
      await element.selectOption({ index });
    });
  }

  static async uploadFile(
    element: Locator,
    filePath: string,
    desc: string
  ): Promise<void> {
    await test.step(`Upload "${desc}"`, async () => {
      await expect(element).toBeVisible();
      await element.setInputFiles(filePath);
    });
  }

  static async hover(
    element: Locator,
    desc: string
  ): Promise<void> {
    await test.step(`Hover "${desc}"`, async () => {
      await expect(element).toBeVisible();
      await element.hover();
    });
  }

  // **Verification (Return Boolean)**
  static async isVisible(
  element: Locator
  ): Promise<boolean> {
  try {
    await expect(element).toBeVisible({
      timeout: GlobalConfig.TIMEOUT_EXPECT
    });
    return true;
  } catch {
    return false;
  }
}

static async isEnabled(
  element: Locator
) {
  try {
    await expect(element).toBeEnabled();
    return true;
  } catch {
    return false;
  }
}

static async hasText(
  element: Locator,
  expectedText: string
): Promise<boolean> {
  try {
    await expect(element).toContainText(expectedText);
    return true;
  } catch {
    return false;
  }
}

static async getText(
  element: Locator
): Promise<string> {
  return (await element.textContent()) || '';
}

static async getAttributeValue(
  element: Locator,
  attr: string,

): Promise<string | null> {
  return await element.getAttribute(attr);
}

// **Wait methods**
static async waitForVisible(
  element: Locator,
  desc: string,
  timeout: number = GlobalConfig.TIMEOUT_WAIT
): Promise<void> {
  await test.step(`Wait : visible "${desc}"`, async () => {
     try {
        await element.waitFor({ state: 'visible', timeout });
      } 
      catch {
        await Actions.hardWait(30);
          try {
            await element.waitFor({ state: 'visible', timeout });
          } catch (retryError) {
            throw new Error(
              `Failed to wait for "${desc}" after retry. Error: ${retryError}`
            );
          }
        }
  });
}

static async waitForHidden(
  element: Locator,
  desc: string,
  timeout: number = GlobalConfig.TIMEOUT_WAIT
): Promise<void> {
  await test.step(`Wait : hidden "${desc}"`, async () => {
    await element.waitFor({ state: 'hidden', timeout });
  });
}

  // **Dynamic click**
  static async clickDynamicElement(
  page: Page,
  selector: string | Locator,
  desc: string
): Promise<void> {
  const locator =
    typeof selector === 'string'
      ? page.locator(selector)
      : selector;

  await test.step(`Dynamic click "${desc}"`, async () => {
    await expect(locator).toBeEnabled({
      timeout: GlobalConfig.TIMEOUT_EXPECT
    });
    await locator.click();
  });
}

// **Table helpers**
static async getTableRowCount(
  table: Locator
): Promise<number> {
  return await table.locator('tbody tr').count();
}

static async getTableCellText(
  table: Locator,
  row: number,
  col: number
): Promise<string> {
  const cell = table.locator(
    `tbody tr:nth-child(${row}) td:nth-child(${col})`
  );
  await expect(cell).toBeVisible();
  return (await cell.textContent()) || '';
}

static async compareString(
  actualStr: string,
  expectedStr: string
): Promise<boolean> {
  let flag = false;
  await test.step(
    `Compared - Actual : "${actualStr}" and Expected : "${expectedStr}"`,
    async () => {
      if (actualStr.includes(expectedStr))
        flag = true;
      }
  );
  return flag;
}

static async savePageAsPDF(
  page: Page,
  filePath: string,
  desc: string
): Promise<void> {
  await test.step(`Save page as PDF - "${desc}"`, async () => {
    const dir = filePath.substring(
      0,
      filePath.lastIndexOf('/')
    );

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await expect(page).toHaveURL(/.*/);
    await page.pdf({
      path: filePath,
      format: 'A4',
      printBackground: true
    });
  });
}


  //============ Alert Dialog Handling=========

static async handleMultipleAlert(
  page: Page,
  expectedCount: number
) {
  const messages: string[] = [];
  return new Promise<string[]>(resolve => {

    const handler = async (dialog: Dialog) => {
      const msg = dialog.message();
      messages.push(msg);
      await Actions.hardWait(1);
      await dialog.accept();
      if (messages.length === expectedCount) {
        page.off('dialog', handler);
        resolve(messages);
      }
    };
    page.on('dialog', handler);
  });
}

// Activate Alert listner and do event after calling this function
static async activateAlertListner(
  page: Page
): Promise<string> {
  const dialog = await page.waitForEvent('dialog');
  const message = dialog.message();
  await Actions.hardWait(1);
  await dialog.accept();
  return message;
}

static async clickAndGetAlertMsg(
  page: Page,
  element: Locator
) {
  const dialogPromise = Actions.activateAlertListner(page);
  await Actions.click(element, 'Click Button');
  const message = await dialogPromise;
  return message;
}

}

