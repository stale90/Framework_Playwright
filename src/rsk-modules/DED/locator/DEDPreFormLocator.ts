import { Page, Locator } from '@playwright/test';


export class DLEDPreFormLocator {

    readonly page: Page;
    readonly lnk_Home: Locator;

    // pre Form section
    readonly lnk_DElEdPrograms: Locator;
    readonly lnk_Schedule: Locator;
    readonly lnk_RegForm: Locator;
    readonly lnk_RegistrationForm: Locator;
    readonly chk_Declaration: Locator;
    readonly btn_Continue: Locator;
    readonly ddl_IsMPBSE: Locator;

    //Other Links
    readonly lnk_DupReceipt: Locator;
    readonly lnk_resetPassword: Locator;
    readonly lnk_PayUnpaid: Locator;
    readonly lnk_EditPaid: Locator;
    readonly lnk_RegCancel: Locator;


    constructor(page: Page) {
        this.page = page;
        // pre Form section
        this.lnk_Home = page.getByRole('link', { name: 'Home|' });
        this.lnk_DElEdPrograms = page.getByRole('link', { name: 'D.El.Ed. Programs' });
        this.lnk_Schedule = page.locator('#Home1_hypSchedule');

        // New form
        this.chk_Declaration = page.getByRole('checkbox', { name: 'मैं सत्यापित/घोषणा करता/करती हूं' });
        this.lnk_RegForm = page.getByRole('link').filter({ hasText: /^$/ }).first();
        this.btn_Continue = page.getByRole('button', { name: 'Continue' });
        this.ddl_IsMPBSE = page.locator('#ddlIsMPBSE');

        //Other Links
        this.lnk_RegistrationForm = page.getByRole('row', { name: 'Registration Form First Round' }).getByRole('link');
        this.lnk_DupReceipt = page.getByRole('link').filter({ hasText: /^$/ }).nth(5);
        this.lnk_PayUnpaid = page.getByRole('link').filter({ hasText: /^$/ }).nth(6);
        this.lnk_resetPassword = page.getByRole('link').filter({ hasText: /^$/ }).nth(7);
        this.lnk_EditPaid = page.getByRole('link').filter({ hasText: /^$/ }).nth(8);
        this.lnk_RegCancel = page.getByRole('link').filter({ hasText: /^$/ }).nth(11);
    }
}