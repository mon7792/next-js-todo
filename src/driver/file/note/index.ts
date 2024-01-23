"use server";
import s3Client from "@/dependency/file";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { Readable } from "stream";

// todo: move this to env
const bucketName = "next-js-todo";

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
  const data = (
    await s3Client.send(
      new GetObjectCommand({ Bucket: bucketName, Key: "az.png" })
    )
  ).Body as Readable;

  // console.log(data);
  if (!data) {
    throw new Error("No data found");
  }

  const dr = streamFile(data);

  const res = new NextResponse(dr, {
    status: 200,
    headers: new Headers({
      "content-disposition": `attachment; filename=az.png`,
      "content-type": "image/png",
      // "content-length": stats.size + "",
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
