import { Page, Locator } from '@playwright/test';

export class DEDReceiptLocator {

    readonly page: Page;
    
    readonly lnk_Home: Locator;

    // Payment Details Section
    readonly lbl_Header: Locator;
    readonly lbl_ApplicationId: Locator;
    readonly lbl_PaidStatus: Locator;
    readonly lbl_TransactionID: Locator;
    readonly lbl_PortalFee: Locator;

    // Personal Details Section
    readonly lbl_ApplicantName:Locator;
    readonly lbl_FatherName:Locator;
    readonly lbl_MotherName:Locator;
    readonly lbl_Gender:Locator;
    readonly lbl_Category:Locator;
    
    readonly lbl_DOB: Locator;
    readonly lbl_Religion: Locator;
    readonly lbl_Domicile: Locator;
    readonly lbl_DomicileRefNo: Locator;
    readonly lbl_DomicileSelfCertify: Locator;
    readonly lbl_DomissueofficeName: Locator;
    readonly lbl_DomIssueDate: Locator;
    readonly lbl_DomDesiOfficer: Locator;

    readonly lbl_ExServiceman: Locator;
    readonly lbl_FamilyIncome: Locator;
    readonly lbl_Handicap: Locator;
    readonly lbl_GovTeacher: Locator;

    // ✅ Address Details
    readonly lbl_HouseNo: Locator;
    readonly lbl_Landmark: Locator;
    readonly lbl_Village: Locator;
    readonly lbl_State: Locator;
    readonly lbl_District: Locator;
    readonly lbl_Tehsil: Locator;
    readonly lbl_PinCode: Locator;
    readonly lbl_Mobile: Locator;
    readonly lbl_Email: Locator;

    // ✅ Education Details
    readonly lbl_10thPassYear: Locator;
    readonly lbl_12thPassYear: Locator;
    readonly lbl_GradPassYear: Locator;

    readonly btn_Home: Locator;

    constructor(page: Page) {
        this.page = page;
 
        this.lnk_Home = page.getByRole('link', { name: 'Home|' });
        // Header Payment Section
        this.lbl_Header = page.locator('#lblHead');
        this.lbl_ApplicationId = page.locator('#lblroll');
        this.lbl_PaidStatus = page.locator('#lblPaidStatus');
        this.lbl_TransactionID = page.locator('#lbltrans');
        this.lbl_PortalFee = page.locator('#lblportal');

        // Personal Details
        this.lbl_ApplicantName = page.locator('#lblCandName');
        this.lbl_FatherName = page.locator('#lblFatherName');
        this.lbl_MotherName = page.locator('#lblMotherName');
        this.lbl_Gender = page.locator('#lblgender');
        this.lbl_Category = page.locator('#lblOriCat');

        // Other details
        this.lbl_DOB = page.locator('#lbl10thdob');
        this.lbl_Religion = page.locator('#lblReligion');
        this.lbl_Domicile = page.locator('#lblmpdom');
        this.lbl_DomicileRefNo = page.locator('#lbldomicilerefno');
        this.lbl_DomissueofficeName = page.locator('#lblissuingoffname');
        this.lbl_DomIssueDate = page.locator('#lbldateofissue');
        this.lbl_DomDesiOfficer = page.locator('#drpdomdesignation');
        this.lbl_DomicileSelfCertify = page.locator('#lbldom_self_certify');
        this.lbl_ExServiceman = page.locator('#lblisExSainik');
        this.lbl_FamilyIncome = page.locator('#lblvarishikAaye');
        this.lbl_Handicap = page.locator('#lblisHandicap');
        this.lbl_GovTeacher = page.locator('#lblGovTeacher');

        // Address Details
        this.lbl_HouseNo = page.locator('#lblhouseno');
        this.lbl_Landmark = page.locator('#lblLandmark');
        this.lbl_Village = page.locator('#lblVillage');
        this.lbl_State = page.locator('#lblAddressState');
        this.lbl_District = page.locator('#lblAddressDist');
        this.lbl_Tehsil = page.locator('#lblAddressTehsil');
        this.lbl_PinCode = page.locator('#lblPin');
        this.lbl_Mobile = page.locator('#lblMobileNo');
        this.lbl_Email = page.locator('#lblEmail');

        // ✅ Education Details
        this.lbl_10thPassYear = page.locator('#lbl10thPassYear');
        // //span[@id = 'lbl12thPassYear']
        this.lbl_12thPassYear = page.locator('#lbl12thPassYear');
        this.lbl_GradPassYear = page.locator('#lblGradPassYear');

        // ✅ Navigation Button
        this.btn_Home = page.getByRole('button', { name: 'Home' });
        
    }
}