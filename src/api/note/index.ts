import { ApiResponse } from "@/types/api";
import { Note } from "@/types/note";

export const createNewNotesRequest = async (note: Note): Promise<ApiResponse> => {
  //  prepare note form data
  const formData = new FormData();
  formData.append("title", note.title);
  formData.append("description", note.description);
  formData.append("receiptFile", note.receiptFile as File);

  //   send request to server
  const response = await fetch("/api/note", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data;
};
