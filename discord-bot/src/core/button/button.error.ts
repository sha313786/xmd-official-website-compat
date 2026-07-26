export class ButtonError {
  /**
   * Converts unknown errors into a user-friendly message.
   */
  public static getMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return "An unexpected error occurred.";
  }
}