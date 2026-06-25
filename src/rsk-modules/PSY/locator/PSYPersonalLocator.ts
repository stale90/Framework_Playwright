import { Locator, Page } from "@playwright/test";

export class PSYPersonalLocator {

    readonly page: Page;

    // Section 1 - Personal Details
    readonly txt_FirstName: Locator;
    readonly txt_MiddleName: Locator;
    readonly txt_LastName: Locator;
    readonly rdo_GenderM: Locator;
    readonly rdo_GenderF: Locator;
    readonly rdo_GenderT: Locator;
    readonly rdo_MaritalStatusY: Locator;
    readonly rdo_MaritalStatusN: Locator;
    readonly rdo_WidowStatusY: Locator;
    readonly rdo_WidowStatusN: Locator;
    readonly txt_FatherName: Locator;
    readonly txt_MotherName: Locator;
    readonly txt_DOB: Locator;
    readonly drp_Religion: Locator;

    readonly valid_FirstName: Locator;
    readonly valid_FatherName: Locator;
    readonly valid_MotherName: Locator;
    readonly valid_Religion: Locator;
    readonly btn_SaveNext: Locator;
    

    constructor(page: Page) {
        this.page = page;

        // Section 1 - Personal Details
        this.txt_FirstName = page.locator('#txtFirstName');
        this.txt_MiddleName = page.locator('#txtMiddleName');
        this.txt_LastName = page.locator('#txtLastName');
        this.rdo_GenderM = page.getByRole('radio', { name: 'पुरूष' });
        this.rdo_GenderF = page.getByRole('radio', { name: 'महिला' });
        this.rdo_GenderT = page.getByRole('radio', { name: 'ट्रांसजेंडर' });
        this.rdo_MaritalStatusY = page.locator('#rdomarritalstatus_0');
        this.rdo_MaritalStatusN = page.locator('#rdomarritalstatus_1');
        this.rdo_WidowStatusY = page.locator('#rdomarritalstatus_0');
        this.rdo_WidowStatusN = page.locator('#rdomarritalstatus_1');
        this.txt_FatherName = page.locator('#txtFatherName');
        this.txt_MotherName = page.locator('#txtMotherName');
        this.txt_DOB = page.locator('#txtDOB');
        this.drp_Religion = page.locator('#drpReligion');
        
        this.valid_FirstName = page.locator('#txtFirstName_ValidText');
        this.valid_FatherName = page.locator('#txtFatherName_ValidText');
        this.valid_MotherName = page.locator('#txtMotherName_ValidText');
        this.valid_Religion = page.locator('#drpReligion_ValidText');
        this.btn_SaveNext = page.getByRole('button', { name: 'Save & Next' });

    }
}