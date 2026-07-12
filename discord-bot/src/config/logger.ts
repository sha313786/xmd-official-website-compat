export class Logger {
  static info(
    message: string,
    data?: unknown
  ) {
    console.log(
      `[INFO] ${message}`,
      data ?? ""
    );
  }

  static warn(
    message: string,
    data?: unknown
  ) {
    console.warn(
      `[WARN] ${message}`,
      data ?? ""
    );
  }

  static error(
    message: string,
    data?: unknown
  ) {
    console.error(
      `[ERROR] ${message}`,
      data ?? ""
    );
  }

  static success(
    message: string,
    data?: unknown
  ) {
    console.log(
      `[SUCCESS] ${message}`,
      data ?? ""
    );
  }
}