"use server";
import s3Client from "@/dependency/file";
import { PutObjectCommand } from "@aws-sdk/client-s3";

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
