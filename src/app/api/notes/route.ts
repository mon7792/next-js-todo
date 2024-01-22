// import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import s3Client from "@/dependency/file";
import { ListBucketsCommand, ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";

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

  const result = await s3Client.send(
    new ListObjectsV2Command({ Bucket: 'next-js-todo' })
  )
  // s3 command to download a file
  //   const result = await s3Client.send(
  //     new GetObjectCommand({
  //       Bucket: "r2-test",
  //       Key: "test.txt",
  //     })
  //   );

  return NextResponse.json(result);
}


export async function POST(request: NextRequest) {
//  read form data
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // here check if the file is a valid image

  // if not return error
  // if yes then upload the file to s3

  // check file size < 5 MB
  console.log(buffer.byteLength < 5 * 1024 * 1024);



  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  
    const result = await s3Client.send(
      new PutObjectCommand({ Bucket: "next-js-todo", Key: file.name, Body: buffer, ContentType: file.type })
    );
  console.log(file.name)

  //   return result;
  return NextResponse.json({ success: true });
}