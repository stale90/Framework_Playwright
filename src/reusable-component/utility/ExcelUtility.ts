import * as XLSX from 'xlsx';
import * as fs from "node:fs/promises";
import * as path from "path";
import { Logger } from "../config/LoggerSetup";
import { access } from "node:fs/promises";

export class ExcelUtility {

  static readExcelSheetData<T>(filePath: string, sheetName: string): T[] {
    try {
      const fullPath = path.resolve(filePath);
      const workbook = XLSX.readFile(fullPath);

      // Validate sheet exists
      if (!workbook.Sheets[sheetName]) {
        throw new Error(`Sheet "${sheetName}" not found, Please recheck Sheet name.`);
      }

      const sheet = workbook.Sheets[sheetName];
      const data: T[] = XLSX.utils.sheet_to_json<T>(sheet, {
        defval: '',  // Handle empty cells
        raw: false   // Formatted strings
      });

      return data;
    } catch (error) {
      Logger.error(`Unknown Error appears while reading Excel sheet: ${sheetName}`);
      return [];  // Empty typed array on error
    }
  }

  static async writeEachRowToExcel<T extends Record<string, any>>(
    filePath: string,
    sheetName: string,
    header: readonly { key: keyof T; label: string }[],
    record: T
  ): Promise<void> {

    let workbook;
    let worksheet;
    let data: any[] = [];

    try {
      await access(filePath);
      workbook = XLSX.readFile(filePath);
    } catch {
      workbook = XLSX.utils.book_new();
    }

    // ✅ Extract header labels
    const headerRow = header.map(h => h.label);
    if (workbook.SheetNames.includes(sheetName)) {
      worksheet = workbook.Sheets[sheetName];
      data = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: ""
      });
    }
    // ✅ Add header if file is empty
    if (!data || data.length === 0) {
      data = [headerRow];
    }

    // ✅ Create new row data using provided sequence (KEY FIX)
    const row = header.map(h => record[h.key] ?? "");
    data.push(row);
    const newSheet = XLSX.utils.aoa_to_sheet(data);

    if (workbook.SheetNames.includes(sheetName)) {
      workbook.Sheets[sheetName] = newSheet;
    } else {
      XLSX.utils.book_append_sheet(workbook, newSheet, sheetName);
    }
    XLSX.writeFile(workbook, filePath);
  }

  static async writeExcelAtOnce<T extends Record<string, any>>(
    filePath: string,
    sheetName: string,
    header: readonly { key: keyof T; label: string }[],
    dataArray: T[]
  ): Promise<void> {

    // Prepare header keys and labels once
    const headerKeys = header.map(h => h.key as string);
    const headerLabels = header.map(h => h.label);

    // Step 1: Create empty worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([]);

    // Step 2: Add header at A1
    XLSX.utils.sheet_add_aoa(worksheet, [headerLabels], { origin: "A1" });

    // Step 3: Add data starting at A2 (IMPORTANT)
    XLSX.utils.sheet_add_json(worksheet, dataArray, {
      header: headerKeys,
      skipHeader: true,
      origin: "A2"
    });

    // Create workbook and append created sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Write file at filePath Location
    XLSX.writeFile(workbook, filePath);
  }

  static async getFilePath(prefix: string): Promise<string> {
    const baseFolder = process.env.CURRENT_EXCEL_REPORT_DIR || path.resolve("Default-Dir");
    const fileName = process.env.TIMESTAMP_FILE_NAME ? `${prefix}_${process.env.TIMESTAMP_FILE_NAME}.xlsx` : "DefaultFileName.xlsx";
    let reportDir = path.resolve(baseFolder);
    await fs.mkdir(reportDir, { recursive: true });
    let filePath = path.join(reportDir, fileName);
    return filePath;
  }

  static async ensureDir(filePath: string) {
    const dir = path.dirname(filePath);
    Logger.info('Directory ' + dir);
    try {
      // Try to access directory
      await fs.access(dir);
    } catch {
      // If not exists → create it
      await fs.mkdir(dir, { recursive: true });
    }
  }

}