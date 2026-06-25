import { Utility } from "../utility/GeneralUtility";

export default async function globalSetup() {
  process.env.CURRENT_EXCEL_REPORT_DIR = Utility.getExcelReportPath() || "DefaultReport";
  process.env.TIMESTAMP_FILE_NAME = Utility.getTimeStampFileName() || "DefaultFileName";
}


