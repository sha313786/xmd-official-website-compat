import * as XLSX from "xlsx";

import type { GoogleFormMember } from "@/types/member-import";

export interface ExcelParseResult {
  success: boolean;

  members: GoogleFormMember[];

  errors: string[];
}

export interface ExcelColumnMap {
  timestamp: number;

  fullName: number;

  discordUsername: number;

  discordId: number;

  rank: number;

  joinDate: number | null;
}

const REQUIRED_COLUMNS = [
  "Timestamp",
  "Character Name",
  "Discord Username",
  "Discord ID",
  "Current Rank",
] as const;

const OPTIONAL_COLUMNS = [
  "Join Date",
] as const;

function normalizeHeader(value: unknown): string {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value)
    .trim()
    .toLowerCase();
}

function getHeaderIndex(
  headers: unknown[],
  header: string,
): number {
  return headers.findIndex(
    (column) =>
      normalizeHeader(column) ===
      normalizeHeader(header),
  );
}

function validateHeaders(
  headers: unknown[],
): string[] {
  const errors: string[] = [];

  for (const column of REQUIRED_COLUMNS) {
    if (getHeaderIndex(headers, column) === -1) {
      errors.push(
        `Missing required column: ${column}`,
      );
    }
  }

  return errors;
}

function createColumnMap(
  headers: unknown[],
): ExcelColumnMap {
  return {
    timestamp: getHeaderIndex(
      headers,
      "Timestamp",
    ),

    fullName: getHeaderIndex(
      headers,
      "Character Name",
    ),

    discordUsername: getHeaderIndex(
      headers,
      "Discord Username",
    ),

    discordId: getHeaderIndex(
      headers,
      "Discord ID",
    ),

    rank: getHeaderIndex(
      headers,
      "Current Rank",
    ),

    joinDate: getHeaderIndex(
      headers,
      "Join Date",
    ),
  };
}

function getCell(
  row: unknown[],
  index: number | null,
): string {
  if (index === null || index < 0) {
    return "";
  }

  const value = row[index];

  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

function isEmptyRow(
  row: unknown[],
): boolean {
  return row.every((cell) => {
    if (cell === undefined || cell === null) {
      return true;
    }

    return String(cell).trim() === "";
  });
}
function sheetToRows(
  sheet: XLSX.WorkSheet,
): unknown[][] {
  return XLSX.utils.sheet_to_json<
    unknown[]
  >(sheet, {
    header: 1,
    raw: false,
    blankrows: false,
    defval: "",
  });
}

function getFirstWorksheet(
  workbook: XLSX.WorkBook,
): XLSX.WorkSheet {
  const firstSheetName =
    workbook.SheetNames[0];

  if (!firstSheetName) {
    throw new Error(
      "No worksheet found in workbook.",
    );
  }

  const worksheet =
    workbook.Sheets[firstSheetName];

  if (!worksheet) {
    throw new Error(
      "Unable to read first worksheet.",
    );
  }

  return worksheet;
}

function parseWorkbook(
  workbook: XLSX.WorkBook,
): {
  rows: unknown[][];
  columnMap: ExcelColumnMap;
} {
  const worksheet =
    getFirstWorksheet(workbook);

  const rows =
    sheetToRows(worksheet);

  if (rows.length === 0) {
    throw new Error(
      "The Excel file is empty.",
    );
  }

  const headers = rows[0];

  const headerErrors =
    validateHeaders(headers);

  if (headerErrors.length > 0) {
    throw new Error(
      headerErrors.join("\n"),
    );
  }

  const columnMap =
    createColumnMap(headers);

  return {
    rows,
    columnMap,
  };
}

function parseExcelBuffer(
  buffer: ArrayBuffer,
): {
  rows: unknown[][];
  columnMap: ExcelColumnMap;
} {
  const workbook =
    XLSX.read(buffer, {
      type: "array",
    });

  return parseWorkbook(
    workbook,
  );
}

function parseExcelFile(
  file: File,
): Promise<{
  rows: unknown[][];
  columnMap: ExcelColumnMap;
}> {
  return new Promise(
    (resolve, reject) => {
      const reader =
        new FileReader();

      reader.onload = (
        event,
      ) => {
        try {
          const buffer =
            event.target
              ?.result as ArrayBuffer;

          resolve(
            parseExcelBuffer(
              buffer,
            ),
          );
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(
          new Error(
            "Failed to read Excel file.",
          ),
        );
      };

      reader.readAsArrayBuffer(
        file,
      );
    },
  );
}function createMember(
  row: unknown[],
  rowNumber: number,
  columnMap: ExcelColumnMap,
): GoogleFormMember {
  const joinDate =
    columnMap.joinDate !== null
      ? getCell(row, columnMap.joinDate)
      : "";

  return {
    rowNumber,

    timestamp: getCell(
      row,
      columnMap.timestamp,
    ),

    fullName: getCell(
      row,
      columnMap.fullName,
    ),

    discordUsername: getCell(
      row,
      columnMap.discordUsername,
    ),

    discordId: getCell(
      row,
      columnMap.discordId,
    ),

    rank: getCell(
      row,
      columnMap.rank,
    ),

    joinDate:
      joinDate === ""
        ? null
        : joinDate,
  };
}

function parseRows(
  rows: unknown[][],
  columnMap: ExcelColumnMap,
): GoogleFormMember[] {
  const members: GoogleFormMember[] = [];

  /**
   * Skip header row.
   */
  for (
    let index = 1;
    index < rows.length;
    index++
  ) {
    const row = rows[index];

    if (isEmptyRow(row)) {
      continue;
    }

    members.push(
      createMember(
        row,
        index + 1,
        columnMap,
      ),
    );
  }

  return members;
}

function validateParsedMembers(
  members: GoogleFormMember[],
): string[] {
  const errors: string[] = [];

  members.forEach((member) => {
    if (
      !member.fullName &&
      !member.discordUsername &&
      !member.discordId
    ) {
      errors.push(
        `Row ${member.rowNumber}: Empty member record.`,
      );
    }

    if (!member.rank) {
      errors.push(
        `Row ${member.rowNumber}: Missing Current Rank.`,
      );
    }

    if (!member.discordId) {
      errors.push(
        `Row ${member.rowNumber}: Missing Discord ID.`,
      );
    }

    if (!member.discordUsername) {
      errors.push(
        `Row ${member.rowNumber}: Missing Discord Username.`,
      );
    }

    if (!member.fullName) {
      errors.push(
        `Row ${member.rowNumber}: Missing Character Name.`,
      );
    }
  });

  return errors;
}
/**
 * Parses an uploaded Excel (.xlsx) file into GoogleFormMember objects.
 */
export async function parseExcelMembers(
  file: File,
): Promise<ExcelParseResult> {
  try {
    const {
      rows,
      columnMap,
    } = await parseExcelFile(file);

    const members = parseRows(
      rows,
      columnMap,
    );

    const errors =
      validateParsedMembers(
        members,
      );

    return {
      success: errors.length === 0,
      members,
      errors,
    };
  } catch (error) {
    return {
      success: false,

      members: [],

      errors: [
        error instanceof Error
          ? error.message
          : "Unknown Excel parsing error.",
      ],
    };
  }
}

/**
 * Returns true if the uploaded file is a supported
 * Microsoft Excel workbook.
 */
export function isExcelFile(
  file: File,
): boolean {
  const extension =
    file.name
      .split(".")
      .pop()
      ?.toLowerCase();

  return (
    extension === "xlsx" ||
    extension === "xls"
  );
}

/**
 * Reads only the worksheet headers.
 * Useful for previewing or validating
 * an uploaded file before parsing.
 */
export async function getExcelHeaders(
  file: File,
): Promise<string[]> {
  const {
    rows,
  } = await parseExcelFile(file);

  if (rows.length === 0) {
    return [];
  }

  return rows[0]
    .map((value) =>
      String(value).trim(),
    )
    .filter(
      (header) =>
        header.length > 0,
    );
}

/**
 * Returns the total number of
 * data rows (excluding the header).
 */
export async function getExcelRowCount(
  file: File,
): Promise<number> {
  const {
    rows,
  } = await parseExcelFile(file);

  if (rows.length <= 1) {
    return 0;
  }

  return rows.length - 1;
}