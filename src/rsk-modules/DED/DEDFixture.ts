import { test as base } from '@playwright/test';
import { ExcelUtility } from '../../reusable-component/utility/ExcelUtility';
import { TestData } from '../../reusable-component/utility/TestDataUtility';
import { Logger } from '../../reusable-component/config/LoggerSetup';
import { DEDFormReport, Pages, DEDFormValidationData, DEDValDataWOScenario} from './DEDTypes';
import { DEDMainFormPage } from './pages/DEDMainFormPage';
import { DEDPreFormPage } from './pages/DEDPreFormPage';
import { DEDPersonalPage } from './pages/DEDPersonalPage';
import { DEDDomicilePage } from './pages/DEDDomicilePage';
import { DEDExperiencePage } from './pages/DEDExperiencePage';
import { DEDEducationPage } from './pages/DEDEducationPage';
import { DEDAddressPage } from './pages/DEDAddressPage';
import { DEDUploadDocumentPage } from './pages/DEDUploadDocumentPage';
import { DEDReceiptPage } from './pages/DEDReceiptPage';
import { DEDOtherFeaturePage } from './pages/DEDOtherFeaturePage';


export const test = base.extend<{
    pages: Pages;
    report: DEDFormReport;
    dataMap: Record<string, DEDValDataWOScenario>;
}>({

    pages: async ({ page }, use) => {
        await use({
            mainForm: new DEDMainFormPage(page),
            preForm: new DEDPreFormPage(page),
            personal: new DEDPersonalPage(page),
            domicile: new DEDDomicilePage(page),
            experience: new DEDExperiencePage(page),
            education: new DEDEducationPage(page),
            address: new DEDAddressPage(page),
            upload: new DEDUploadDocumentPage(page),
            receipt: new DEDReceiptPage(page),
            otherFeature : new DEDOtherFeaturePage(page),
        });
    },
        
    report: async ({ }, use, testInfo) => {
        const report = createEmptyReport();
        const filepath = await ExcelUtility.getFilePath('Registration');
        const sheetName = 'TestResults';
        //Your Test run Below
        await use(report);
        // afterEach equivalent
        Logger.info('Test Status :' + testInfo.status);
        let status = "UNKNOWN";
        if (testInfo.status === "passed") status = "PASS";
        if (testInfo.status === "failed") status = "FAIL";
        if (testInfo.status === "skipped") status = "SKIP";
        report.test_status = status;
        await ExcelUtility.writeEachRowToExcel<DEDFormReport>(
            filepath,
            sheetName, 
            headerRegistration, 
            report
        );
    },
    dataMap: async ({ }, use) => {
        const testData = TestData.getData<DEDFormValidationData>('DEDFormValidationData');
        const filepath = await ExcelUtility.getFilePath('Validation');
        const sheetName = 'TestReport';
        // Test runs
        const key = 'scenario';
        const dataMap = TestData.convertDataToRecord(testData, key);
        await use(dataMap);
        // Convert Record → Array
        const dataArray = await convertRecordToArray(dataMap);
        ExcelUtility.writeExcelAtOnce<DEDFormValidationData>(
            filepath,
            sheetName,
            headerValidation,
            dataArray
        );
    },
    
});

// Initialise Reporter
export function createEmptyReport(): DEDFormReport {
    const emptyReport = {} as DEDFormReport;

    headerRegistration.forEach(({ key }) => {
        emptyReport[key as keyof DEDFormReport] = 'Default';
    });
    return emptyReport;
}

async function convertRecordToArray(dataMap: Record<string, DEDValDataWOScenario>) {
    const dataArray = [];
    for (const key in dataMap) {
        dataArray.push({
            scenario: key,
            ...dataMap[key]
        });
    }
    return dataArray;
}

async function convertRecordsToArray<T, K extends string>(
  dataMap: Record<K, T>,
  keyName: string
): Promise<(T & Record<string, K>)[]> {
  const result: (T & Record<string, K>)[] = [];

  for (const key in dataMap) {
    const value = dataMap[key];

    result.push({
      [keyName]: key, // dynamic key name (e.g., "scenario")
      ...value
    } as T & Record<string, K>);
  }

  return result;
}

const headerRegistration = [
    { key: 'test_id', label: 'Test ID' },
    { key: 'test_desc', label: 'Test Desc' },
    { key: 'scenario', label: 'Scenario' },
    { key: 'name', label: 'Name' },
    { key: 'mobile_no', label: 'Mobile No' },
    { key: 'email', label: 'Email' },
    { key: 'dob', label: 'Dob' },
    { key: 'application_id', label: 'Application Id' },
    { key: 'reference_id_1', label: 'Reference Id 1' },
    { key: 'reference_id_2', label: 'Reference Id 2' },
    { key: 'application_fee', label: 'Application Fee' },
    { key: 'pay_status', label: 'Pay Status' },
    { key: 'transaction_id_1', label: 'Transaction Id 1' },
    { key: 'transaction_id_2', label: 'Transaction Id 2' },
    { key: 'password', label: 'Password' },
    { key: 'test_status', label: 'Test Status' }
] as const;

const headerValidation = [
    { key: 'test_id', label: 'Test ID' },
    { key: 'test_desc', label: 'Test Desc' },
    { key: 'test_comment', label: 'Test Comment' },
    { key: 'scenario', label: 'Scenario' },
    { key: 'valid_input', label: 'Valid Input' },
    { key: 'expected_error_message', label: 'Expected Messages' },
    { key: 'actual_error_message', label: 'Actual Messages' },
    { key: 'test_status', label: 'Test Status' }
] as const;
