// import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import s3Client from "@/dependency/file";
import {
  ListBucketsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import * as z from "zod";
import { insertNote } from "@/driver/db/note";
import { Note } from "@/types/note";
import { ApiResponse } from "@/types/api";

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
      (file) => [".jpg", ".jpeg", "png"].includes(file.type),
      "Only these types are allowed .jpg, .jpeg, .png, .webp and mp4"
    )
    .optional(),
});

export async function POST(request: NextRequest) {
  //  read form data
  const data = await request.formData();
  const formPayload = Object.fromEntries(data);
  try {
    // 1. parse payload
    const newNotes = NewNotesFormSchema.parse(formPayload);

    console.log("new-NOtes:",newNotes);

    // const note: Note = {
    //   uid: "uid-123",
    //   title: newNotes.title,
    //   description: newNotes.description,
    //   completed: false,
    //   receipt: "",
    // };

    // await insertNote(note, "uid-123");

    // 2. input sanitization

    // 3. business logic

    // 4. save to database

    // 5. send reponse to client.
    // subscribe them to a newsletter or whatever

    // const file: File | null = data.get("file") as unknown as File;

    // if (!file) {
    //   return NextResponse.json({ success: false });
    // }
    // const bytes = await file.arrayBuffer();
    // const buffer = Buffer.from(bytes);

    // here check if the file is a valid image

    // if not return error
    // if yes then upload the file to s3

    // check file size < 5 MB
    // console.log(buffer.byteLength < 1 * 1024 * 1024);

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location

    //   const result = await s3Client.send(
    //     new PutObjectCommand({ Bucket: "next-js-todo", Key: file.name, Body: buffer, ContentType: file.type })
    //   );
    // console.log(file.name)

    //   return result;
    const response: ApiResponse = {
      success: true,
      message: "Note created successfully",
      id: "note-123"
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
