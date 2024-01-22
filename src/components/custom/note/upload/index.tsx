"use client";
import { useState } from "react";

export default function UploadNotesForm() {
  const [file, setFile] = useState<File | null>();

  const handleFileUpload = async (event: any) => {
    event.preventDefault();
    

    if (!file) return;

    // await uploadFile(file)

    // fetch post form data request to send file
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/notes", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);

    // console.log(file.name)
  };

  return (
    <div>
      <p>Upload Files</p>
      <form onSubmit={(e) => handleFileUpload(e)}>
        <label htmlFor="file-upload">File Upload</label>
        <br />
        <input
          multiple={false}
          id="file-upload"
          type="file"
          onChange={(e) => {
            if (!e.target.files || e.target.files.length === 0) return;
            setFile(e.target.files[0]);
          }}
        />
        <br />
        <div
          style={{
            marginBottom: "10px",
          }}
        />
        <button>Submit</button>
      </form>

      {/* <UserButton afterSignOutUrl="/" /> */}
    </div>
  );
}
