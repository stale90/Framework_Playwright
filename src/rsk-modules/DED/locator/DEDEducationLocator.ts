import { Page, Locator } from '@playwright/test';

export class DEDEducationLocator {

  readonly page: Page;

  // 10th Details
  readonly txt_10thPassYear: Locator;
  readonly ddl_10thGradPer: Locator;
  readonly txt_10thObtMarks: Locator;
  readonly txt_10thOutOf: Locator;
  readonly txt_10thGrade: Locator;
  readonly txt_10thPercentage: Locator;
  readonly ddl_10thBoard: Locator;
  readonly txt_10thRollNo: Locator;
  // 12th Details
  readonly ddl_SubjectGroup: Locator;
  readonly txt_12thPassYear: Locator;
  readonly ddl_12thGradPer: Locator;
  readonly txt_12thObtMarks: Locator;
  readonly txt_12thOutOf: Locator;
  readonly txt_12thGrade: Locator;
  readonly txt_12thPercent: Locator;
  readonly ddl_12thBoard: Locator;
  readonly txt_12thRollNo: Locator;

  constructor(page: Page) {

    this.page = page;
    // 10th Elements
    this.txt_10thPassYear = page.locator('#txt10thPassYear');
    this.ddl_10thGradPer = page.locator('#ddl10thGradPer');
    this.txt_10thObtMarks = page.locator('#txt10thObtMarks');
    this.txt_10thOutOf = page.locator('input[name="txt10thOutOf"]');
    this.txt_10thPercentage = page.locator('#txt10thPercent');
    this.txt_10thGrade = page.locator('#txt10thGrade');
    this.ddl_10thBoard = page.locator('select[name="ddl10thBoard"]');
    this.txt_10thRollNo = page.locator('input[name="txt10RollNo"]');
    // 12th Elements
    this.ddl_SubjectGroup = page.locator('#ddlSubjectGroup');
    this.txt_12thPassYear = page.locator('#txt12thPassYear');
    this.ddl_12thGradPer = page.locator('#ddl12thGradPer');
    this.txt_12thObtMarks = page.locator('#txt12thObtMarks');
    this.txt_12thOutOf = page.locator('#txt12thOutOf');
    this.txt_12thPercent = page.locator('#txt12thPercent');
    this.txt_12thGrade = page.locator('#txt12thGrade');
    this.ddl_12thBoard = page.locator('select[name="txt12thBoard"]');
    this.txt_12thRollNo = page.locator('#txt12thRollNo');
  }
}
