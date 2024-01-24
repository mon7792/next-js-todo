"use server";
import { NextRequest, NextResponse } from "next/server";
import { downloadNoteReceipt } from "@/driver/file/note";

export async function GET(request: NextRequest, response: NextResponse) {

  // The input must contain the note id and receipt. 
  // TODO: check if the user is allowed to download the file.

  //  4 cases.
  // 1. notes is invalid or not found
  // 2. notes is valid but not accesible by current user
  // 3. notes is valid and there is no receipt
  // 4. notes is valid and there is receipt


  // success download
  // failure to download


  return await downloadNoteReceipt("az.png", response);
}
