import { Page, Locator } from '@playwright/test';

export class DEDExperienceLocator {

  readonly page: Page;
  readonly rdo_GovTeacherY: Locator;
  readonly rdo_GovTeacherN: Locator;
  readonly txt_SchoolName: Locator;
  readonly txt_DOJ: Locator;
  readonly ddl_WorkDistrict: Locator;
  readonly txt_DiceNo: Locator;

  constructor(page: Page) {

    this.page = page;
    this.rdo_GovTeacherY = page.locator('#RdoGovtTeacher_0');
    this.rdo_GovTeacherN = page.locator('#RdoGovtTeacher_1');
    this.txt_SchoolName = page.locator('#txtSchoolName');
    this.txt_DOJ = page.locator('#txtDOJ');
    this.ddl_WorkDistrict = page.locator('#ddlWrkDistrict');
    this.txt_DiceNo = page.locator('#txtDiceNo');
     
  }
}
