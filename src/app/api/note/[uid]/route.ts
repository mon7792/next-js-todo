"use server";

import { deleteNote } from "@/driver/db/note";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api";
import { AppError } from "@/utils/error/app";

const noteNotExtRsp: ApiResponse = {
  success: false,
  message: "note not found",
};

const noteSrvErrRsp: ApiResponse = {
  success: false,
  message: "server error",
};

const noteDelSuccess: ApiResponse = {
  success: true,
  message: "note deleted successfully",
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    // get the uid
    const uid = params.uid as string;

    //  mark the note for deletion
    await deleteNote(uid, "dummy-123");

    //  remove cache
    revalidateTag("notes");
    revalidateTag(`note${uid}`);
    return NextResponse.json(noteDelSuccess);
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof AppError && err.statusCode === 404) {
      noteNotExtRsp.error = err;
      return NextResponse.json(noteNotExtRsp, { status: 404 });
    }
    return NextResponse.json(noteSrvErrRsp, { status: 500 });
  }
}
