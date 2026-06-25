import { Locator, Page } from "@playwright/test";

export class PSYDomicileLocator {

    readonly page: Page;
    // Section 2 - Domicile Details
    readonly ddl_State: Locator;
    readonly ddl_Category: Locator;
    readonly ddl_CategoryDesignation: Locator;
    readonly ddl_DomicileDesignation: Locator;
    // Certificate type radio buttons
    readonly rdo_SelfDeclCert: Locator;
    readonly rdo_DomCertificate: Locator;
    // Ex-Serviceman radio buttons
    readonly rdo_ExServiceman_Y: Locator;
    readonly rdo_ExServiceman_N: Locator;
    // Freedom Fighter radio buttons
    readonly rdo_FreedomFighter_Y: Locator;
    readonly rdo_FreedomFighter_N: Locator;
    // Disability (40%) radio buttons
    readonly rdo_Disability40_Y: Locator;
    readonly rdo_Disability40_N: Locator;
    // Disability Type radio buttons
    readonly rdo_Disability_LH: Locator;
    readonly rdo_Disability_VH: Locator;
    readonly rdo_Disability_DH: Locator;
    readonly rdo_Disability_MH: Locator;
    // Text fields
    readonly txt_DomicileRefNo: Locator;
    readonly txt_DomicileDateOfIssue: Locator;
    readonly txt_DomicileOffice: Locator;
    readonly txt_DomicileOtherIssuingOfficer: Locator;
    readonly txt_CategoryRefNo: Locator;
    readonly txt_CategoryDateOfIssue: Locator;
    readonly txt_CategoryIssuingOfficer: Locator;

    readonly btn_SaveNext : Locator;
    readonly valid_DomState: Locator;
    readonly valid_DomRefNo: Locator;
    readonly valid_DomIssueOffice: Locator;
    readonly valid_DomIssueDesig: Locator;

    readonly valid_Category: Locator;
    readonly valid_CategoryRefno: Locator;
    readonly valid_CatIssuePlace: Locator;
    readonly valid_CatissueOfficer: Locator;


    //readonly valid_DomRefNo: Locator;

    constructor(page: Page) {
        this.page = page;
        // Section 2 - Domicile Details
        // Dropdowns
        this.ddl_State = page.locator('#DdlState');
        this.ddl_Category = page.locator('#DdlCategory');
        this.ddl_CategoryDesignation = page.locator('#drpcatdesignation');
        this.ddl_DomicileDesignation = page.locator('#drpdomdesignation');
        //Radio
        this.rdo_SelfDeclCert = page.locator('#rdoSelfCertify_0');
        this.rdo_DomCertificate = page.locator('#rdoSelfCertify_1');
        this.rdo_ExServiceman_Y = page.locator('#rdoExSainik_0');
        this.rdo_ExServiceman_N = page.locator('#rdoExSainik_1');
        this.rdo_FreedomFighter_Y = page.locator('#rdoFFighters_0');
        this.rdo_FreedomFighter_N = page.locator('#rdoFFighters_1');
        this.rdo_Disability40_Y = page.locator('#rdoHandi_0');
        this.rdo_Disability40_N = page.locator('#rdoHandi_1');
        this.rdo_Disability_LH = page.locator('#rdoHandiType_0');
        this.rdo_Disability_VH = page.locator('#rdoHandiType_1');
        this.rdo_Disability_DH = page.locator('#rdoHandiType_2');
        this.rdo_Disability_MH = page.locator('#rdoHandiType_3');
        // Text fields
        this.txt_DomicileRefNo = page.locator('#txtdomicilerefno');
        this.txt_DomicileDateOfIssue = page.locator('#txtdateofissue');
        this.txt_DomicileOffice = page.locator('#txtissuingoffname');
        this.txt_DomicileOtherIssuingOfficer = page.locator('#txtdomdesignation');
        this.txt_CategoryRefNo = page.locator('#txtcatrefno');
        this.txt_CategoryDateOfIssue = page.locator('#txtcatdoi');
        this.txt_CategoryIssuingOfficer = page.locator('#txtcatissuingofficer');

        this.btn_SaveNext = page.getByRole('button', { name: 'Save & Next' });
        this.valid_DomState = page.locator('#DdlState_ValidText');
        this.valid_DomRefNo = page.locator('#txtdomicilerefno_ValidText');
        this.valid_DomIssueOffice = page.locator('#txtissuingoffname_ValidText');
        this.valid_DomIssueDesig = page.locator('#drpdomdesignation_ValidText');

        this.valid_CategoryRefno = page.locator('#txtcatrefno_ValidText');
        this.valid_Category= page.locator('#DdlCategory_ValidText');
        this.valid_CatIssuePlace= page.locator('#txtcatissuingofficer_ValidText');
        this.valid_CatissueOfficer= page.locator('#drpcatdesignation_ValidText');
        



    }
}