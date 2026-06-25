import * as fs from 'fs';
import { GlobalConfig } from '../config/PlaywrightSetup';

export class Utility {

  // function to return current date as  04-16-2026
  static getCurrentDate(): string {
    const now = new Date();
    const current_date = now
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
    return current_date;
    //04-16-2026
  }

  // function to return current date as format  04-16-2026-13_04_59
  static getDateTimeStamp(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const timeStampFileName = `${month}-${day}-${year}-${hours}_${minutes}_${seconds}`;
    return timeStampFileName;
    // "2026-04-16-12_54_23"
  }

  // function to get unique Report folder locations: Date format
  static getExcelReportPath(): string {
    let date = Utility.getCurrentDate();
    let excelReportPath = `${GlobalConfig.EXCEL_REPORTS_BASE_FOLDER}/${date}`;
    return excelReportPath;
  }

  // function to get unique name includes timestamp and date
  static getTimeStampFileName(): string {
    let timeStamp = Utility.getDateTimeStamp();
    let excelFileName = `${timeStamp}`;
    return excelFileName;
  }

  // 10 digit random number
  static getRandom10DigitMobileNumber(): string {
    const firstDigit = Math.floor(Math.random() * 4) + 6; // 6, 7, 8, or 9
    const remainingDigits = Math.floor(Math.random() * 1_000_000_000)
      .toString()
      .padStart(9, '0');

    return `${firstDigit}${remainingDigits}`;
  }

  // 6 digit random number
  static getRandom6DigitNumber(): string {
    const number = Math.floor(Math.random() * 900000) + 100000;
    return number.toString();
  }

  // 5 digit random number
  static getRandom5DigitNumber(): string {
    const number = Math.floor(Math.random() * 90000) + 10000;
    return number.toString();
  }

  // 7 digit random number
  static getRandom7DigitNumber(): string {
    const number = Math.floor(Math.random() * 9_000_000) + 1_000_000;
    return number.toString();
  }

  // Random email: user + 5-digit number + domain
  static getRandomEmailID(domain: string = "testmail.com"): string {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // ensures 5 digits
    return `user${randomNumber}@${domain}`;
  }

  // Fetch Application ID from Dialog Box
  static getApplicationIdFromMessage(message: string) {
    // Regex to capture application ID pattern (anyPrefix P,D,B followed by alphanumeric)
    //const match = message.match(/P[A-Z0-9]+/);
    const match = message.match(/\b[A-Z][A-Z0-9]{5,}\b/);
    if (!match) {
      throw new Error(`Application ID not found in message: ${message}`);
    }
    return match[0];
  }

  // Fetch Application ID and Verification Code
  static extractVerificationCode(message: string): {
    appID: string | '';
    code: string | '';
  } {
    const refMatch = message.match(/Dear\s+(\S+),/);
    const codeMatch = message.match(/Verification Code is\s+(\S+)/);
    return {
      appID: refMatch ? refMatch[1] : '',
      code: codeMatch ? codeMatch[1] : '',
    };
  }

  // Calculate percentage
  static calculatePercentage(obtainedMarks: number, totalMarks: number): number {
    if (totalMarks === 0) {
      throw new Error("Total marks cannot be zero");
    }
    return (obtainedMarks / totalMarks) * 100;
  }
}
