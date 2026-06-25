import { test as base } from '@playwright/test';
import { Pages, PSYFormReport, PSYFormValidationData, PSYFormValidationReport, PSYValDataWOScenario } from './PSYTypes';
import { Logger } from '../../reusable-component/config/LoggerSetup';
import { ExcelUtility } from '../../reusable-component/utility/ExcelUtility';
import { TestData } from '../../reusable-component/utility/TestDataUtility';

import { PSYMainFormPage } from './pages/PSYMainFormPage';
import { PSYPreFormPage } from './pages/PSYPreFormPage';
import { PSYPersonalPage } from './pages/PSYPersonalPage';
import { PSYDomicilePage } from './pages/PSYDomicilePage';
import { PSYExperiencePage } from './pages/PSYExperiencePage';
import { PSYEducationPage } from './pages/PSYEducationPage';
import { PSYAddressPage } from './pages/PSYAddressPage';
import { PSYUploadDocumentPage } from './pages/PSYUploadDocumentPage';
import { PSYReceiptPage } from './pages/PSYReceiptPage';
import { PSYOtherFeaturePage } from './pages/PSYOtherFeaturePage';

export const test = base.extend<{
    pages: Pages;
    report: PSYFormReport;
    dataMap: Record<string, PSYValDataWOScenario>;
}>({

    pages: async ({ page }, use) => {
        await use({
            mainForm: new PSYMainFormPage(page),
            preForm: new PSYPreFormPage(page),
            personal: new PSYPersonalPage(page),
            domicile: new PSYDomicilePage(page),
            experience: new PSYExperiencePage(page),
            education: new PSYEducationPage(page),
            address: new PSYAddressPage(page),
            upload: new PSYUploadDocumentPage(page),
            receipt: new PSYReceiptPage(page),
            otherFeature:new PSYOtherFeaturePage(page),
        });
    },

    dataMap: async ({ }, use) => {
            const testData = TestData.getData<PSYFormValidationData>('PSYFormValidationData');
            const filepath = await ExcelUtility.getFilePath('Validation');
            const sheetName = 'TestReport';        
            // Test runs
            const key = 'scenario';
            const dataMap = TestData.convertDataToRecord(testData, key);
            await use(dataMap);
            
            // Convert Record → Array
            const dataArray = await convertRecordToArray(dataMap);
            ExcelUtility.writeExcelAtOnce<PSYFormValidationReport>(
                filepath, 
                sheetName, 
                headerValidation, 
                dataArray
            );
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
        await ExcelUtility.writeEachRowToExcel<PSYFormReport>(
            filepath,
            sheetName, 
            headerRegistration, 
            report
        );
    },
    
});

// Initialise Reporter
export function createEmptyReport(): PSYFormReport {
    const emptyReport = {} as PSYFormReport;

    headerRegistration.forEach(({ key }) => {
        emptyReport[key as keyof PSYFormReport] = 'Default';
    });

    return emptyReport;
}

async function convertRecordToArray(dataMap: Record<string, PSYValDataWOScenario>) {
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
