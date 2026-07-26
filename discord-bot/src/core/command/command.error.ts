export class CommandError {
  public static getMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return "An unexpected error occurred.";
  }
}