"use server";
import { NextRequest, NextResponse } from "next/server";
import { downloadNoteReceipt } from "@/driver/file/note";
import { ApiResponse } from "@/types/api";
import { AppError, BaseError } from "@/utils/error/app";

const errfileNoteFound = "file not found";

const fsNotValidRsp: ApiResponse = {
  success: false,
  message: "invalid file name",
};

const fsNotExtRsp: ApiResponse = {
  success: false,
  message: "file not found",
};

const fsSrvErrRsp: ApiResponse = {
  success: false,
  message: "server error",
};

export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } },
  response: NextResponse
) {
  try {
    const name = params.name as string;

    // The input must contain the note id and receipt.
    // TODO: check if the user is allowed to download the file.

    //  4 cases.
    // 1. notes is invalid or not found
    // 2. notes is valid but not accesible by current user
    // 3. notes is valid and there is no receipt
    // 4. notes is valid and there is receipt

    // success download
    // failure to download

    // name length must be greater than 0
    if (name && name.trim().length === 0) {
      return NextResponse.json(fsNotValidRsp, { status: 400 });
    }
    return await downloadNoteReceipt(name, response);
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof AppError && err.statusCode === 404) {
      fsNotExtRsp.error = err;
      return NextResponse.json(fsNotExtRsp, { status: 404 });
    }
    return NextResponse.json(fsSrvErrRsp, { status: 500 });
  }
}
