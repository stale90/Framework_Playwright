import { Locator, Page } from "@playwright/test";

export class DEDPersonalLocator {

    readonly page: Page;

    // Section 1 - Personal Details
    readonly txt_FirstName: Locator;
    readonly txt_MiddleName: Locator;
    readonly txt_LastName: Locator;
    readonly rdo_GenderM: Locator;
    readonly rdo_GenderF: Locator;
    readonly txt_FatherName: Locator;
    readonly txt_MotherName: Locator;
    readonly txt_DOB: Locator;
    readonly drp_Religion: Locator;
    

    constructor(page: Page) {
        this.page = page;
        // Section 1 - Personal Details
        this.txt_FirstName = page.locator('#txtFirstName');
        this.txt_MiddleName = page.locator('#txtMiddleName');
        this.txt_LastName = page.locator('#txtLastName');
        this.rdo_GenderM = page.locator('#rdoGender_0');
        this.rdo_GenderF = page.locator('#rdoGender_1');
        this.txt_FatherName = page.locator('#txtFatherName');
        this.txt_MotherName = page.locator('#txtMotherName');
        this.txt_DOB = page.locator('#txtDOB');
        this.drp_Religion = page.locator('#drpReligion');
    }
}