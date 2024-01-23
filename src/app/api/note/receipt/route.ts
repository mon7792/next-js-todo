"use server";
import { NextRequest, NextResponse } from "next/server";
import { downloadNoteReceipt } from "@/driver/file/note";

export async function GET(request: NextRequest, response: NextResponse) {
  return await downloadNoteReceipt("az.png", response);
}
