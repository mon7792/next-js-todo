"use client";
import * as z from "zod";

// convApiRspToZodError api response error to zod error
export const convApiRspToZodError = (error: any): z.ZodError<any> | null => {
  if (!error) return null;

  if (!error.name || error.name !== "ZodError") return null;

  if (!error.issues) return null;

  return z.ZodError.create(error.issues);
};

export const isZodError = (error: any): boolean => {
  if (!error) return false;

  if (!error.name || error.name !== "ZodError") return false;

  if (!error.issues) return false;

  return error instanceof z.ZodError;
};