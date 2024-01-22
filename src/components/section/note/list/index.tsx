import NoteCard from "@/components/custom/note/card";

export default function NoteList() {
  return (
    <>
    <div className="text-4xl font-bold">Notes</div>
    <div className="mt-4 grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
        <NoteCard uid="1" title="Note 1" description="This is note 1" />
        <NoteCard uid="2" title="Note 2" description="This is note 2" />
        <NoteCard uid="3" title="Note 3" description="This is note 3" />
        <NoteCard uid="4" title="Note 4" description="This is note 4" />
        <NoteCard uid="5" title="Note 5" description="This is note 5" />
    </div>
    </>
  )
}
