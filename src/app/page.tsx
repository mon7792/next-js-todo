import { UserButton } from "@clerk/nextjs";
import NewNotesForm from "@/components/custom/note/new";
import NoteList from "@/components/section/note/list";
// import { uploadFile } from "@/utils/server-action/upload-file";

export default function Page() {
  return (
    <div>
      {/* <NewNotesForm />
      <UserButton afterSignOutUrl="/" /> */}
      <NoteList />
    </div>
  );
}
