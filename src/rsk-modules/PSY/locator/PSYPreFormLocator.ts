import { Locator, Page } from "@playwright/test";


export class PSYPreFormLocator {

    readonly page: Page;
    readonly lnk_Home: Locator;
    
    // pre Form section
    readonly lnk_Header: Locator;
    readonly lnk_PsychologyPost: Locator;
    readonly lnk_Schedule: Locator;
    readonly lnk_RegForm: Locator;
    readonly lnk_DupReceipt: Locator;
    readonly lnk_resetPassword: Locator;
    readonly lnk_PayUnpaid: Locator;
    readonly lnk_EditPaid: Locator;
    readonly lnk_RegCancel: Locator;


    constructor(page: Page) {
        this.page = page;

        // pre Form section
        this.lnk_Home = page.getByRole('link', { name: 'Home|' });
        this.lnk_Header = page.locator('.header');
        this.lnk_PsychologyPost = page.getByRole('link', { name: 'M.A.(Psychology)/ Post' });
        this.lnk_Schedule = page.locator('#Home1_hypSchedule');
        this.lnk_RegForm = page.getByRole('link').filter({ hasText: /^$/ }).first();
        this.lnk_DupReceipt = page.getByRole('link').filter({ hasText: /^$/ }).nth(1);
        this.lnk_PayUnpaid = page.getByRole('link').filter({ hasText: /^$/ }).nth(2);
        this.lnk_resetPassword = page.getByRole('link').filter({ hasText: /^$/ }).nth(3);
        this.lnk_EditPaid = page.getByRole('link').filter({ hasText: /^$/ }).nth(4);
        this.lnk_RegCancel = page.getByRole('link').filter({ hasText: /^$/ }).nth(6);
        
    }
}