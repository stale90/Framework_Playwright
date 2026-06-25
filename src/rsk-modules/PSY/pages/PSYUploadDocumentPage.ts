import { Page } from '@playwright/test'
import { Actions } from "../../../reusable-component/utility/ActionUtility";
import { PSYFormInputData } from "../PSYTypes";
import { PSYUploadLocator } from '../locator/PSYUploadLocator';
import { GlobalConfig } from '../../../reusable-component/config/PlaywrightSetup';

export class PSYUploadDocumentPage extends PSYUploadLocator {

    readonly page: Page;
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    // Upload photo on RSK Form
    async uploadPhoto(data: PSYFormInputData) {
        if (data.upload_photo === "Yes")
            await Actions.uploadFile(this.btn_UploadPhoto, `${GlobalConfig.RESOURCE_DIR}/photo.jpg`, "Applicant Photo");
    }

    // Upload Other Document on RSK Form
    async uploadAllDocuments(data: PSYFormInputData) {
        await this.upload10thCertificate(data.upload_10th_cert);
        await this.upload12thCertificate(data.upload_12th_cert);
        await this.uploadUGCertificate(data.upload_ug_cert);
        await this.uploadPGCertificate(data.upload_pg_cert);
        await this.uploadDomicileCertificate(data.upload_dom_cert);
        await this.uploadCastCertificate(data.upload_cast_cert);
        await this.uploadIncomeCertificate(data.upload_income_cert);
        await this.uploadHandicapedCertificate(data.upload_handi_cert);
        await this.uploadEwsCertificate(data.upload_ews_cert);
    }

    async acceptUploadAlert() {
        await Actions.waitForVisible(this.div_DialogBox, "Alert box");
        let message = await Actions.getText(this.div_DialogMessage);
        await Actions.addStepMessage(`Alert Box Message  ${message}`);
        await Actions.click(this.btn_Ok, "Ok Button");
    }

    async upload10thCertificate(upload: string) {
        if (upload === "Yes") {
            await Actions.hardWait(3);
            await Actions.uploadFile(this.btn_Upload10th, `${GlobalConfig.RESOURCE_DIR}/tenth.jpg`, "Applicant 10th Certificate");
            await Actions.click(this.btn_Up10th, "Upload button");
            await this.acceptUploadAlert();
        }
    }

    async upload12thCertificate(upload: string) {
        if (upload === "Yes") {
            await Actions.hardWait(3);
            await Actions.uploadFile(this.btn_Upload12th, `${GlobalConfig.RESOURCE_DIR}/twelth.jpg`, "Applicant 12th Certificate");
            await Actions.click(this.btn_Up12th, "Upload button");
            await this.acceptUploadAlert();
        }
    }

    async uploadUGCertificate(upload: string) {
        if (upload === "Yes") {
            await Actions.hardWait(3);
            await Actions.uploadFile(this.btn_UploadUG, `${GlobalConfig.RESOURCE_DIR}/UG.jpg`, "Applicant UG Certificate");
            await Actions.click(this.btn_UpUG, "Upload button");
            await this.acceptUploadAlert();
        }
    }

    async uploadPGCertificate(upload: string) {
        if (upload === "Yes") {
            await Actions.hardWait(3);
            await Actions.uploadFile(this.btn_UploadPG, `${GlobalConfig.RESOURCE_DIR}/PG.jpg`, "Applicant PG Certificate");
            await Actions.click(this.btn_UpPG, "Upload button");
            await this.acceptUploadAlert();
        }
    }

    async uploadDomicileCertificate(upload: string) {
        if (upload === "Yes") {
            await Actions.hardWait(3);
            await Actions.uploadFile(this.btn_UploadDomicile, `${GlobalConfig.RESOURCE_DIR}/domicile.jpg`, "Applicant Domicile Certificate");
            await Actions.click(this.btn_UpDomicile, "Upload button");
            await this.acceptUploadAlert();
        }
    }

    async uploadCastCertificate(upload: string) {
        if (upload === "Yes") {
            await Actions.hardWait(3);
            await Actions.uploadFile(this.btn_UploadCast, `${GlobalConfig.RESOURCE_DIR}/category.jpg`, "Applicant Cast Certificate");
            await Actions.click(this.btn_UpCast, "Upload button");
            await this.acceptUploadAlert();
        }
    }
    async uploadIncomeCertificate(upload: string) {
        if (upload === "Yes") {
            await Actions.hardWait(3);
            await Actions.uploadFile(this.btn_UploadIncome, `${GlobalConfig.RESOURCE_DIR}/income.jpg`, "Applicant Income Certificate");
            await Actions.click(this.btn_UpIncome, "Upload button");
            await this.acceptUploadAlert();
        }
    }

    async uploadHandicapedCertificate(upload: string) {
        if (upload === "Yes") {
            await Actions.hardWait(3);
            await Actions.uploadFile(this.btn_UploadHandiCert, `${GlobalConfig.RESOURCE_DIR}/handicaped.jpg`, "Handicaped Certificate");
            await Actions.click(this.btn_UpHandi, "HandiCaped Upload button");
            await this.acceptUploadAlert();
        }
    }

    async uploadEwsCertificate(upload: string) {
        if (upload === "Yes") {
            await Actions.hardWait(3);
            await Actions.uploadFile(this.btn_UploadEwsCert, `${GlobalConfig.RESOURCE_DIR}/ews.jpg`, "EWS Certificate");
            await Actions.click(this.btn_UpEws, "EWS Upload button");
            await this.acceptUploadAlert();
        }
    }
}
