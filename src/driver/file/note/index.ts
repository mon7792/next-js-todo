"use server";
import s3Client from "@/dependency/file";
import { BaseError } from "@/utils/error/app";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { Readable } from "stream";

// todo: move this to env
const bucketName = "next-js-todo";

const errfileNoteFound = "file not found";

// uploadNoteReceipt uploads note receipt to s3
// TODO: proper way to handle error
export const uploadNoteReceipt = async (
  fsNm: string,
  fsType: string,
  fsCont: Buffer
): Promise<boolean> => {
  const res = await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fsNm,
      Body: fsCont,
      ContentType: fsType,
    })
  );

  console.log(res);

  //   todo: confirm is the upload was successful

  return res.$metadata.httpStatusCode === 200;
};

export const downloadNoteReceipt = async (
  fsNm: string,
  response: NextResponse
) => {
  const resp = await s3Client.send(
    new GetObjectCommand({ Bucket: bucketName, Key: fsNm })
  );

  if (resp.$metadata.httpStatusCode !== 200) {
    console.error(errfileNoteFound, ":", fsNm);
    throw BaseError(404, errfileNoteFound);
  }

  // content type, content length
  const fsType = resp.ContentType;
  const fsLen = resp.ContentLength;
  console.log(fsType, fsLen); 

  const data = resp.Body as Readable;
  const dr = streamFile(data);

  const res = new NextResponse(dr, {
    status: 200,
    headers: new Headers({
      "content-disposition": `attachment; filename=${fsNm}`,
      "content-type": `${fsType}`,
      "content-length": `${fsLen}`,
    }),
  });

  return res;
};

function streamFile(downloadStream: Readable): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      downloadStream.on("data", (chunk: Buffer) =>
        controller.enqueue(new Uint8Array(chunk))
      );
      downloadStream.on("end", () => controller.close());
      downloadStream.on("error", (error: NodeJS.ErrnoException) =>
        controller.error(error)
      );
    },
    cancel() {
      downloadStream.destroy();
    },
  });
}
