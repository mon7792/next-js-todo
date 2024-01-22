import { Note } from "@/types/note";
import { getNotes, getNote } from "@/driver/db/note";
import { unstable_cache } from "next/cache";

// TODO: associate the cache with the user
export const getCachedNotes = unstable_cache(async () => {
  console.log("cache miss");
  return await getNotes();
}, ["notes"]);

export const getCachedNote = async (uid: string) => {
  const getCachedNotes = unstable_cache(
    async (uid) => {
      console.log("cache miss");
      return await getNote(uid, "userUID");
    },
    ["note", uid]
  );

  return await getCachedNotes(uid);
};
