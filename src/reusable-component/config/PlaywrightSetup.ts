import { devices } from "@playwright/test";
import dotenv from "dotenv";
import { Utility } from "../utility/GeneralUtility";

export type ProjectConfig = {
  name: string;
  use: any;
}

dotenv.config();

// .env file properties
export const GlobalConfig = {

  OUTPUR_DIR: 'test-results',

  GLOBAL_SETUP: './src/reusable-component/config/GlobalSetup',

  TEST_DIR: './src/test-scripts',

  RESOURCE_DIR: './resource',

  SAUCEDEMO_BASE_URL: process.env.SAUCEDEMO_BASE_URL!,

  TEST_URL: process.env.TEST_URL!,

  ALLURE_RESULTS_BASE_FOLDER: process.env.ALLURE_RESULTS_BASE_FOLDER || "allure-results",

  HTML_REPORTS_BASE_FOLDER: process.env.HTML_REPORTS_BASE_FOLDER || "html-report",

  EXCEL_REPORTS_BASE_FOLDER: process.env.EXCEL_REPORTS_BASE_FOLDER || "excel-report",

  MY_MESSAGE: process.env.MY_MESSAGE || "Keep Walking, We Are Close",

  TEST_DATA_LOCATION: process.env.TEST_DATA_EXCEL_LOCATION || "./test-data/TestData.xlsx",

  TIMEOUT_GLOBAL: parseInt(process.env.TIMEOUT_GLOBAL || "60000"),

  TIMEOUT_ACTION: parseInt(process.env.TIMEOUT_ACTION || "30000"),

  TIMEOUT_WAIT: parseInt(process.env.TIMEOUT_WAIT || "30000"),

  TIMEOUT_NAVIGATION: parseInt(process.env.TIMEOUT_NAVIGATION || "100000"),

  TIMEOUT_EXPECT: parseInt(process.env.TIMEOUT_EXPECT || "30000"),

  WORKERS: parseInt(process.env.WORKERS || "2"),

  FULLY_PARALLEL_FLAG: process.env.FULLY_PARALLEL_FLAG?.toLowerCase() === 'true',

  RETRIES_ON_FAILURE: parseInt(process.env.RETRIES_ON_FAILURE || "0"),

  HEADLESS_FLAG: process.env.HEADLESS_FLAG?.toLowerCase() === 'true',

  PROJECT_BROWSER_NAME: process.env.PROJECT_BROWSER_NAME || "chromium",

  PROJECTS: createProjectsBrowserConfig((process.env.PROJECT_BROWSER_NAME || 'chromium').split('|')) as ProjectConfig[],

};

// function to get unique Report folder locations
export function getReportPaths(): Map<string, string> {
  const paths = new Map<string, string>();
  let date = Utility.getCurrentDate();
  let timeStamp = Utility.getDateTimeStamp();
  let htmlReportPath = `${GlobalConfig.HTML_REPORTS_BASE_FOLDER}/${date}/html_${timeStamp}`;
  let allureReportPath = `${GlobalConfig.ALLURE_RESULTS_BASE_FOLDER}/${date}/${timeStamp}`;
  paths.set("html", `${htmlReportPath}`)
  paths.set("allure", `${allureReportPath}`)
  return paths;
}

// Create Project Configuration for playwright.config , Multiple Browser Support
export function createProjectsBrowserConfig(browserNames: string[]): ProjectConfig[] {
  const deviceRecord: Record<string, string> = {
    chromium: "Desktop Chrome",
    firefox: "Desktop Firefox",
    webkit: "Desktop Safari",
    pixel5: "Pixel 5",
    iPhone12: "iPhone 12",
    edge: "Desktop Edge",
  };

  return browserNames.map((browserName) => {
    const projectName = browserName || "chromium";
    const deviceName = deviceRecord[browserName] || "Desktop Chrome";

    return {
      name: projectName,
      use: {
        ...devices[deviceName as keyof typeof devices],
      },
    } as ProjectConfig;
  });
}
