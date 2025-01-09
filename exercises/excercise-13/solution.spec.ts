/* JAVASCRIPT */

/* PLAYWRIGHT */
import path from "path";
import os from "os";
import fs from "fs";

import { expect, test } from "@playwright/test";
import { parse } from "csv-parse/sync";

// Initial header definition and header mapping
const originHeaderRow = "STT,Tên học sinh,Lớp,Điểm Toán,Điểm Lý,Điểm Hóa";
const headerMapping = new Map([
  ["STT", "no"],
  ["Tên học sinh", "fullname"],
  ["Lớp", "class"],
  ["Điểm Toán", "math_point"],
  ["Điểm Lý", "physics_point"],
  ["Điểm Hóa", "chemistry_point"],
]);

// List of new students
const newRecords = [
  {
    no: "",
    fullname: "Nguyễn Văn Nam",
    class: "10A6",
    math_point: "8",
    physics_point: "8",
    chemistry_point: "8",
  },
  {
    no: "",
    fullname: "Trần Thị Nga",
    class: "10A6",
    math_point: "9",
    physics_point: "9",
    chemistry_point: "9",
  },
];

// Support function to create student authentication key according to "Student name - Class"
function buildValueKey(name, className) {
  return `${name} - ${className}`;
}

// Function to read and process CSV files
function processCsv(fileContent, newRecords) {
  // Analyze CSV content and map header
  const records = parse(fileContent, {
    delimiter: ",",
    trim: true,
    skip_empty_lines: true,
    columns: (headers) => headers.map((header) => headerMapping.get(header)),
  });

  // Remove students from class 10A3 and add new students
  let updatedRecords = records.filter((record) => record.class !== "10A3");
  updatedRecords = [...updatedRecords, ...newRecords];

  // Update sequence number (STT)
  updatedRecords.forEach((record, index) => {
    record.no = index + 1;
  });

  return updatedRecords;
}

// Function to write the list of new students to CSV
function writeCsv(records, headerRow, filePath) {
  let csvContent = headerRow;
  for (const record of records) {
    csvContent += "\n" + Object.values(record).join(",");
  }
  fs.writeFileSync(filePath, csvContent);
}

// Test Playwright
test("problem 13 - Export, Process, and Import CSV", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/021-import-export.html");

  // 1.Export CSV file
  const tmpDir = os.tmpdir();
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#exportButton").click();
  const downloadFile = await downloadPromise;

  const exportedFilePath = path.join(tmpDir, downloadFile.suggestedFilename());
  await downloadFile.saveAs(exportedFilePath);

  // 2. Process data from CSV files
  const fileContent = fs.readFileSync(exportedFilePath, { encoding: "utf-8" });
  const updatedRecords = processCsv(fileContent, newRecords);

  // 3. Ghi file CSV mới
  const newCsvPath = path.join(tmpDir, "student_to_import.csv");
  writeCsv(updatedRecords, originHeaderRow, newCsvPath);

  // 4. Re-import the new CSV file
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.locator("#importButton").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(newCsvPath);

  // 5. Check the results
  const rows = await page.locator("#studentTable tbody tr").all();

  // Checked there were no more students in class 10A3
  for (const row of rows) {
    if (await row.isVisible()) {
      const classCellValue = await row.locator("td").nth(2).innerText();
      expect(classCellValue).not.toBe("10A3");
    }
  }

  // New student testing has been added
  const recordsSet = new Set();
  for (const row of rows) {
    if (await row.isVisible()) {
      const studentName = await row.locator("td").nth(1).innerText();
      const className = await row.locator("td").nth(2).innerText();
      recordsSet.add(buildValueKey(studentName, className));
    }
  }

  for (const record of newRecords) {
    expect(recordsSet.has(buildValueKey(record.fullname, record.class))).toBe(
      true
    );
  }

  // 6. Clean up temporary files
  await downloadFile.delete();
  fs.rmSync(newCsvPath);
  fs.rmSync(exportedFilePath);
});
