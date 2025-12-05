"use client";

import { useState } from "react";

export default function ImageUpload({ returnImage }) {
  const [imageUrl, setImageUrl] = useState(false);

  const handleImageAsFile = async (e) => {
    const image = e.target.value;
    returnImage(image);
  };

  return (
    <div>
      <label>
        <input
          className="w-full px-3 py-1 rounded border border-gray-500 border-dashed"
          placeholder="Enter Cover Image Url"
          type="text"
          onChange={handleImageAsFile}
        />
      </label>
      {/* {imageUrl && (
        <div className="mt-4 w-32 h-32 rounded border border-gray-300">
          <img
            src={imageUrl}
            alt="preview"
            className="w-full h-full object-cover rounded"
          />
        </div>
      )} */}
    </div>
  );
}
