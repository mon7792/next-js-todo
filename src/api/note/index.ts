import { ApiResponse } from "@/types/api";
import { Note } from "@/types/note";

export const createNewNotesRequest = async (
  note: Note
): Promise<ApiResponse> => {
  //  prepare note form data
  const formData = new FormData();
  formData.append("title", note.title);
  formData.append("description", note.description);
  if (note.receiptFile) {
    formData.append("receiptFile", note.receiptFile as File);
  }

  //   send request to server
  const response = await fetch("/api/note", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data;
};

export const editNoteRequest = async (
  note: Note
): Promise<ApiResponse> => {
  //  prepare note form data
  const formData = new FormData();
  if (note.title.trim().length) formData.append("title", note.title.trim());
  if (note.description.trim().length) formData.append("description", note.description.trim()); 
  if (note.receiptFile) formData.append("receiptFile", note.receiptFile as File);
  
  //   send request to server
  const response = await fetch(`/api/note/${note.uid}`, {
    method: "PUT",
    body: formData,
  });

  const data = await response.json();
  return data;
}
