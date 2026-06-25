import { Page, Locator } from '@playwright/test';

export class DEDUploadDocumentLocator {

  readonly page: Page;
  readonly btn_UploadPhoto: Locator;
  readonly chk_Agreement: Locator;
  readonly btn_SaveNext: Locator;

  readonly div_DialogBox : Locator;
  readonly div_DialogMessage : Locator;
  readonly btn_Ok: Locator;

  readonly btn_Upload10th: Locator;
  readonly btn_Upload12th: Locator;
  readonly btn_UploadUG: Locator;
  readonly btn_UploadPG: Locator;
  readonly btn_UploadDomicile: Locator;
  readonly btn_UploadCast: Locator;
  readonly btn_UploadIncome: Locator;
  readonly btn_UploadHandiCert: Locator;
  readonly btn_UploadEwsCert: Locator;


  readonly btn_Up10th: Locator;
  readonly btn_Up12th: Locator;
  readonly btn_UpUG: Locator;
  readonly btn_UpPG: Locator;
  readonly btn_UpDomicile: Locator;
  readonly btn_UpCast: Locator;
  readonly btn_UpIncome: Locator;
  readonly btn_UpHandi: Locator;
  readonly btn_UpEws: Locator;

  readonly btn_View10th: Locator;
  readonly btn_View12th: Locator;
  readonly btn_ViewUG: Locator;
  readonly btn_ViewPG: Locator;
  readonly btn_ViewDomicile: Locator;
  readonly btn_ViewCast: Locator;
  readonly btn_ViewIncome: Locator;
  readonly btn_ViewHandi: Locator;
  readonly btn_ViewEws: Locator;


  constructor(page: Page) {

    this.page = page;

    this.btn_UploadPhoto = page.locator('#fuPhoto');
    this.btn_SaveNext = page.getByRole('button', { name: 'Save & Next' })
    this.chk_Agreement = page.locator('#chkb');
    this.btn_Upload10th = page.locator('#fu10thMS');
    this.btn_Upload12th = page.locator('#fu12thMS');
    this.btn_UploadUG = page.locator('#fuUGMS');
    this.btn_UploadPG = page.locator('#fuPGMS');
    this.btn_UploadDomicile = page.locator('#fuDom');
    this.btn_UploadCast = page.locator('#fuCat');
    this.btn_UploadIncome = page.locator('#fuIncome');
    this.btn_UploadHandiCert = page.locator('#fuHandi');
    this.btn_UploadEwsCert = page.locator('#fuEWS');


    this.div_DialogBox = page.locator('#divMsg');
    this.div_DialogMessage = page.locator("//div[@id= 'divMsg']//tbody//tbody/tr[1]/td");
    this.btn_Ok = page.locator('#btnOK');    
    
    this.btn_Up10th = page.locator('#btnUpload10thMS');
    this.btn_Up12th = page.locator('#btnUpload12thMS');
    this.btn_UpUG = page.locator('#btnUploadUGMS');
    this.btn_UpPG = page.locator('#btnUploadPGMS');
    this.btn_UpDomicile = page.locator('#btnUploadDom');
    this.btn_UpCast = page.locator('#btnUploadCat');
    this.btn_UpIncome = page.locator('#btnUploadIncome');
    this.btn_UpHandi = page.locator('#btnUploadHandi');
    this.btn_UpEws = page.locator('#btnUploadEWS');

    this.btn_View10th = page.locator('#lnk10th');
    this.btn_View12th = page.locator('#lnk12th');
    this.btn_ViewUG = page.locator('#lnkUG');
    this.btn_ViewPG = page.locator('#lnkPG');
    this.btn_ViewDomicile = page.locator('#lnkdom');
    this.btn_ViewCast = page.locator('#lnkcat');
    this.btn_ViewIncome = page.locator('#lnkincome');
    this.btn_ViewHandi = page.locator('#lnkHandi');
    this.btn_ViewEws = page.locator('#lnkEWSCerti');

    
    //getByRole('cell', { name: 'हाई स्कूल/दसवीं प्रमाण पत्र *' })
    //getByRole('cell', { name: 'हायर सेकेण्डरी/इंटरमीडिएट प्रमाण पत्र *' })
    //getByRole('cell', { name: 'स्नातक प्रमाण पत्र *' })
    //getByRole('cell', { name: 'स्नातकोत्तर प्रमाण पत्र *' })
    //getByRole('cell', { name: 'मूल निवासी प्रमाण पत्र  *' })
    //getByRole('cell', { name: 'श्रेणी प्रमाण पत्र *' })
    //getByRole('cell', { name: 'आय प्रमाण पत्र (अन्य पिछड़ा वर्ग हेतु ) *' })
    // निःशक्तता प्रमाण पत्र
    // तहसीलदार से अनिम्न श्रेणी के अधिकारी द्वारा जारी आर्थिक रूप से कमजोर

  }
}
