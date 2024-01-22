import { UserButton } from "@clerk/nextjs";
import UploadNotesForm from "@/components/custom/note/upload";
// import { uploadFile } from "@/utils/server-action/upload-file";

export default function Page() {
  return (
    <div>
      <UploadNotesForm />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
