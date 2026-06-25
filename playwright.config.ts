import { defineConfig } from "@playwright/test";
import { GlobalConfig , getReportPaths } from "./src/reusable-component/config/PlaywrightSetup";

let reportPaths = getReportPaths();

/*
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig ({
  
  /* Test Directory folder */
  testDir: GlobalConfig.TEST_DIR,

  globalSetup : GlobalConfig.GLOBAL_SETUP,
  
  /* disable 'test-results' output folder */
  outputDir: GlobalConfig.OUTPUR_DIR,

  /* Timeout set to 60 seconds */
  timeout: GlobalConfig.TIMEOUT_GLOBAL,
  
  /* Set Workers to 2 so that Internet slow issue can be handled */
  workers: GlobalConfig.WORKERS,

  /* Run tests in files in parallel */
  fullyParallel: GlobalConfig.FULLY_PARALLEL_FLAG,

  /* Retries tests once after first fail */
  retries: GlobalConfig.RETRIES_ON_FAILURE,

  use: {
    actionTimeout: GlobalConfig.TIMEOUT_ACTION,
    navigationTimeout:GlobalConfig.TIMEOUT_NAVIGATION,
    headless: GlobalConfig.HEADLESS_FLAG,
    screenshot:'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  expect:{
    timeout: GlobalConfig.TIMEOUT_EXPECT,
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Browser configuration set in Prjocet config */
  projects: GlobalConfig.PROJECTS,

  /* Report configuration setting */
  reporter:[[ "allure-playwright", { resultsDir: reportPaths.get('allure') }],],       
});

// [ "html", { outputFolder: reportPaths.get('html')} ],