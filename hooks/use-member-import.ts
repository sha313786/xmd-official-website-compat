"use client";

import {
  useCallback,
  useMemo,
  useState,
} from "react";

import type {
  GoogleFormMember,
  ImportSummary,
  ImportValidationError,
} from "@/types/member-import";

import {
  parseExcelMembers,
} from "@/utils/excel-parser";

import {
  memberImportService,
} from "@/services/member-import.service";

export interface UseMemberImportReturn {
  members: GoogleFormMember[];

  validationErrors: ImportValidationError[];

  summary: ImportSummary | null;

  loading: boolean;

  importing: boolean;

  selectedRows: number[];

  fileName: string | null;

  hasFile: boolean;

  hasValidationErrors: boolean;

  canImport: boolean;

  uploadExcel: (
    file: File,
  ) => Promise<boolean>;

  previewImport: () => Promise<void>;

  importMembers: () => Promise<boolean>;

  clearImport: () => void;

  selectRow: (
    rowNumber: number,
  ) => void;

  unselectRow: (
    rowNumber: number,
  ) => void;

  toggleRow: (
    rowNumber: number,
  ) => void;

  selectAll: () => void;

  clearSelection: () => void;
}

const EMPTY_SUMMARY: ImportSummary = {
  processed: 0,

  imported: 0,

  skipped: 0,

  duplicateMembers: 0,

  duplicateDiscordIds: 0,

  invalidRanks: 0,

  invalidDiscordIds: 0,

  invalidJoinDates: 0,

  missingFields: 0,
};

export function useMemberImport(): UseMemberImportReturn {
  const [
    members,
    setMembers,
  ] = useState<
    GoogleFormMember[]
  >([]);

  const [
    validationErrors,
    setValidationErrors,
  ] = useState<
    ImportValidationError[]
  >([]);

  const [
    summary,
    setSummary,
  ] = useState<
    ImportSummary | null
  >(null);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    importing,
    setImporting,
  ] = useState(false);

  const [
    selectedRows,
    setSelectedRows,
  ] = useState<number[]>(
    [],
  );

  const [
    fileName,
    setFileName,
  ] = useState<
    string | null
  >(null);

  const hasFile =
    useMemo(
      () =>
        members.length > 0,
      [members],
    );

  const hasValidationErrors =
    useMemo(
      () =>
        validationErrors.length >
        0,
      [validationErrors],
    );

  const canImport =
    useMemo(
      () =>
        hasFile &&
        selectedRows.length >
          0,
      [
        hasFile,
        selectedRows,
      ],
    );
      const uploadExcel =
    useCallback(
      async (
        file: File,
      ): Promise<boolean> => {
        setLoading(true);

        try {
          const result =
            await parseExcelMembers(
              file,
            );

          setMembers(
            result.members,
          );

          setValidationErrors(
            [],
          );

          setSummary(
            EMPTY_SUMMARY,
          );

          setSelectedRows(
            result.members.map(
              (member) =>
                member.rowNumber,
            ),
          );

          setFileName(
            file.name,
          );

          return result.success;
        } catch (error) {
          console.error(
            "[useMemberImport] Excel upload failed:",
            error,
          );

          setMembers([]);

          setValidationErrors([]);

          setSummary(null);

          setSelectedRows([]);

          setFileName(null);

          return false;
        } finally {
          setLoading(false);
        }
      },
      [],
    );

  const previewImport =
    useCallback(
      async (): Promise<void> => {
        if (
          members.length === 0
        ) {
          return;
        }

        setLoading(true);

        try {
          const preview =
            await memberImportService.previewImport(
              members,
            );

          setSummary(
            preview.summary,
          );

          setValidationErrors(
            preview.validationErrors,
          );
        } finally {
          setLoading(false);
        }
      },
      [members],
    );

  const clearImport =
    useCallback(() => {
      setMembers([]);

      setValidationErrors([]);

      setSummary(null);

      setSelectedRows([]);

      setFileName(null);
    }, []);
      const selectRow =
    useCallback(
      (
        rowNumber: number,
      ) => {
        setSelectedRows(
          (
            current,
          ) => {
            if (
              current.includes(
                rowNumber,
              )
            ) {
              return current;
            }

            return [
              ...current,
              rowNumber,
            ];
          },
        );
      },
      [],
    );

  const unselectRow =
    useCallback(
      (
        rowNumber: number,
      ) => {
        setSelectedRows(
          (
            current,
          ) =>
            current.filter(
              (
                row,
              ) =>
                row !==
                rowNumber,
            ),
        );
      },
      [],
    );

  const toggleRow =
    useCallback(
      (
        rowNumber: number,
      ) => {
        setSelectedRows(
          (
            current,
          ) => {
            if (
              current.includes(
                rowNumber,
              )
            ) {
              return current.filter(
                (
                  row,
                ) =>
                  row !==
                  rowNumber,
              );
            }

            return [
              ...current,
              rowNumber,
            ];
          },
        );
      },
      [],
    );

  const selectAll =
    useCallback(() => {
      setSelectedRows(
        members.map(
          (
            member,
          ) =>
            member.rowNumber,
        ),
      );
    }, [members]);

  const clearSelection =
    useCallback(() => {
      setSelectedRows([]);
    }, []);
      const importMembers =
    useCallback(
      async (): Promise<boolean> => {
        if (
          selectedRows.length ===
          0
        ) {
          return false;
        }

        setImporting(true);

        try {
          const selectedMembers =
            members.filter(
              (member) =>
                selectedRows.includes(
                  member.rowNumber,
                ),
            );

          const result =
            await memberImportService.importMembers(
              selectedMembers,
            );

          setSummary(
            result.summary,
          );

          setValidationErrors(
            result.validationErrors,
          );

          if (
            result.success
          ) {
            setMembers([]);

            setValidationErrors([]);

            setSummary(
              result.summary,
            );

            setSelectedRows([]);

            setFileName(null);
          }

          return result.success;
        } catch (error) {
          console.error(
            "[useMemberImport] Import failed:",
            error,
          );

          return false;
        } finally {
          setImporting(false);
        }
      },
      [
        members,
        selectedRows,
      ],
    );
      return {
    members,

    validationErrors,

    summary,

    loading,

    importing,

    selectedRows,

    fileName,

    hasFile,

    hasValidationErrors,

    canImport,

    uploadExcel,

    previewImport,

    importMembers,

    clearImport,

    selectRow,

    unselectRow,

    toggleRow,

    selectAll,

    clearSelection,
  };
  }