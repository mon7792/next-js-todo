// import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { Note } from "@/types/note";
import { ApiResponse } from "@/types/api";
import { createNote } from "@/usecases/note/create";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  // TODO: get user id from session clerk js
  const userUID = "uid-123";

  const noteList: Note[] = [];

  return NextResponse.json(noteList);
}

const NewNotesFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "description must be at least 3 characters.",
  }),

  receiptFile: z
    .custom<File>()
    .refine((file) => {
      return file.size <= 1 * 1024 * 1024;
    }, `File size should be less than 1MB.`)
    .refine(
      (file) => ["image/jpg", "image/jpeg", "image/png"].includes(file.type),
      "Only these types are allowed .jpg, .jpeg, and .png"
    )
    .optional(),
});

export async function POST(request: NextRequest) {
  //  read form data
  const data = await request.formData();
  const formPayload = Object.fromEntries(data);
  try {
    // 1. parse payload
    const reqNote = NewNotesFormSchema.parse(formPayload);

    // 2. prepare note usecase
    const noteUID = await createNote(reqNote);

    //  remove cache
    revalidateTag("notes");

    //   return result;
    const response: ApiResponse = {
      success: true,
      message: "Note created successfully",
      id: noteUID
    };
  

    return NextResponse.json(response);
  } catch (error: unknown) {
    console.error(`form not submitted ${error}`);

    //   return result;
    const response: ApiResponse = {
      success: false,
      message: "Note creation Failed",
      error: (error as Error),
    };

    return NextResponse.json(response);
  }
}
