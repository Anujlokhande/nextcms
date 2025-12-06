"use client";

import { useState } from "react";

export default function ImageUpload({ returnImage }) {
  const [imageUrl, setImageUrl] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageAsFile = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (!file) return;
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
      method: "POST",
      body: data,
    });
    const json = await res.json();
    setLoading(false);
    if (json.url) {
      setImageUrl(json.url);
      returnImage(json.url);
    } else alert(json.error || "upload failed");
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          className="w-1/3 px-3 py-1 rounded border border-gray-500 border-dashed"
          placeholder="Enter Cover Image Url"
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
          }}
        />
        <button
          className="border border-gray-500 rounded w-30 px-3 py-1"
          type="button"
          onClick={handleImageAsFile}
          disabled={loading || !file}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
      {imageUrl && (
        <div className="mt-4 w-32 h-32 rounded border border-gray-300">
          <img
            src={imageUrl}
            alt="preview"
            className="w-full h-full object-cover rounded"
          />
        </div>
      )}
    </div>
  );
}
