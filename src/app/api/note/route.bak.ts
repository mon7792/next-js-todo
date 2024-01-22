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

export async function GET(request: NextRequest) {
  //   const data = await request.formData();
  //   const file: File | null = data.get("file") as unknown as File;

  //   if (!file) {
  //     return NextResponse.json({ success: false });
  //   }
  //   const bytes = await file.arrayBuffer();
  //   const buffer = Buffer.from(bytes);

  //   // With the file data in the buffer, you can do whatever you want with it.
  //   // For this, we'll just write it to the filesystem in a new location
  //   const path = `/tmp/${file.name}`;
  //   await writeFile(path, buffer);
  //   console.log(`open ${path} to see the uploaded file`);

  // const result = await s3Client.send(new ListBucketsCommand({}));

  // const result = await s3Client.send(
  //   new ListObjectsV2Command({ Bucket: "next-js-todo" })
  // );
  // s3 command to download a file
  //   const result = await s3Client.send(
  //     new GetObjectCommand({
  //       Bucket: "r2-test",
  //       Key: "test.txt",
  //     })
  //   );


  // TODO: get user id from session clerk js
  const userUID = "uid-123";

  const noteList : Note[] = [

  ]

  return NextResponse.json(noteList);
}

const NewNotesFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "description must be at least 3 characters.",
  }),

  receipt: z
    .custom<File>()
    .refine((file) => {
      return file.size <= 1 * 1024 * 1024;
    }, `File size should be less than 1MB.`)
    // .refine(
    //   (file) => [".jpg", ".jpeg", "png"].includes(file.type),
    //   "Only these types are allowed .jpg, .jpeg, .png, .webp and mp4"
    // )
    .optional(),
});

export async function POST(request: NextRequest) {
  //  read form data
  const data = await request.formData();
  const formPayload = Object.fromEntries(data);
  try {
    // 1. parse payload
    const newNotes = NewNotesFormSchema.parse(formPayload);

    const note: Note = {
      uid: "uid-123",
      title: newNotes.title,
      description: newNotes.description,
      completed: false,
      receipt: "",
      done: false,
    };

    await insertNote(note, "uid-123");

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
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`form not submitted ${error}`);
    return NextResponse.json({ success: false });
  }
}
