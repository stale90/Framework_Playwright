import { Locator, Page } from "@playwright/test";

export class PSYAddressLocator {
    readonly page: Page;
    // Section Address Detail
    readonly txt_HouseNo: Locator;
    readonly txt_LandMark: Locator;
    readonly txt_City: Locator;
    readonly txt_MobileNo: Locator;
    readonly txt_EmailID: Locator;
    readonly txt_Pincode: Locator;
    // Address dropdowns
    readonly ddl_State: Locator;
    readonly ddl_District: Locator;
    readonly ddl_Tehsil: Locator;

    constructor(page: Page) {
        this.page = page;
        // Text fields
        this.txt_HouseNo = page.locator('#txtAddress');
        this.txt_LandMark = page.locator('#txtAddress2');
        this.txt_City = page.locator('#txtCity');
        this.txt_MobileNo = page.locator('#txtMobileNo');
        this.txt_EmailID = page.locator('#txtEmailID');
        this.txt_Pincode = page.locator('#txtPincode');
        // Dropdowns
        this.ddl_State = page.locator('#DdlAddrState');
        this.ddl_District = page.locator('#ddlDistrict');
        this.ddl_Tehsil = page.locator('#ddlTehsil');

    }
}