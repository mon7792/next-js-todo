import { getNotes } from "@/driver/db/note";
import { unstable_cache } from "next/cache";

// TODO: associate the cache with the user
export const getCachedNotes = unstable_cache(async () => getNotes(), ["notes"]);
