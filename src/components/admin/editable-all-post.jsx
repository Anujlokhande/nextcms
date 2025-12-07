"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditableAllPost({ post }) {
  const router = useRouter();
  const [currStatus, setCurrStatus] = useState(post.status);

  const handleDelete = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      setCurrStatus("DELETE");
      router.refresh();
    }
  };

  const handleConvertToDraft = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/state`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: "DRAFT" }),
      }
    );
    if (res.ok) {
      setCurrStatus("DRAFT");
      router.refresh();
    }
  };

  const handlePublish = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/state`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: "PUBLISHED" }),
      }
    );
    console.log(res.ok);

    if (res.ok) {
      setCurrStatus("PUBLISHED");
      router.refresh();
    }
  };

  return (
    <div className="flex">
      <div className="bg-gray-600/20 p-3 rounded-lg w-full flex gap-3 flex-col sm:justify-between sm:flex-row md:flex-row">
        <div>
          <h2 className="font-bold text-lg">{post.title}</h2>
          <p className="text-sm text-gray-300">
            {post.excerpt.substring(0, 20)}...
          </p>
          <span className="text-sm text-gray-400">
            {new Date(post.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex gap-3 space-x-2 items-center mt-1.5 ">
          {currStatus === "PUBLISHED" ? (
            <button
              onClick={() => handleConvertToDraft(post.id)}
              className="text-black bg-gray-400/60 rounded-sm p-2 text-sm"
            >
              Convert To Draft
            </button>
          ) : (
            <button
              onClick={() => handlePublish(post.id)}
              className="text-black bg-gray-400/60 rounded-sm p-2 text-sm"
            >
              Publish
            </button>
          )}
          {currStatus == "PUBLISHED" ? (
            <button
              className="text-black bg-gray-400/60 rounded-sm p-2 text-sm w-[70px] "
              onClick={() => {
                router.push(`/blog/${post.slug}`);
              }}
            >
              View
            </button>
          ) : null}
          <Trash
            onClick={() => {
              handleDelete(post.id);
            }}
            className="size-3 text-gray-400 "
          />
        </div>
      </div>
    </div>
  );
}
