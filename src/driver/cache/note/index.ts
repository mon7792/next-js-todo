import { Note } from "@/types/note";
import { getNotes, getNote } from "@/driver/db/note";
import { unstable_cache } from "next/cache";

// TODO: associate the cache with the user
export const getCachedNotes = unstable_cache(
  async () => {
    console.log("cache miss");
    return await getNotes();
  },
  ["notes"],
  {
    tags: ["notes"],
  }
);

export const getCachedNote = async (uid: string) => {
  const getCachedNotes = unstable_cache(
    async (uid) => {
      console.log("cache miss");

      const note = await getNote(uid, "userUID");

      // TODO: move this to insertion layer
      if (note.receipt && note.receipt.trim() !== "") {
        note.receipt = `/api/note/receipt/${note.receipt}`;
      }
      console.log(note.receipt);

      return note;
    },
    ["note", uid],
    {
      tags: ["note", uid],
    }
  );

  return await getCachedNotes(uid);
};
