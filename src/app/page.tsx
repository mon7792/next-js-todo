import { UserButton } from "@clerk/nextjs";
import NewNotesForm from "@/components/custom/note/new";
// import { uploadFile } from "@/utils/server-action/upload-file";

export default function Page() {
  return (
    <div>
      <NewNotesForm />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
