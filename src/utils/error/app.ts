type ErrorName = "BaseError" | "ValidationError";

export class AppError extends Error {
  name: ErrorName;
  message: string;
  statusCode: number;
  cause: any;

  constructor({
    name,
    message,
    statusCode,
    cause,
  }: {
    name: ErrorName;
    message: string;
    statusCode: number;
    cause?: any;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
    this.cause = cause;
  }
}

export const BaseError = (statusCode: number, message: string): Error => {
  return new AppError({ name: "BaseError", message, statusCode });
};
