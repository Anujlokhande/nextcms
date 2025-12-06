"use client";
import React, { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import { toast } from "sonner";

export default function EditPrevDraft({ params }) {
  // Use React.use to unwrap possible thenable `params`. If React.use is not available,
  // fall back to the provided `params` value.
  const resolvedParams =
    typeof React.use === "function" ? React.use(params) : params;
  const { slug } = resolvedParams || {};

  const [post, setPost] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/v1/update/${slug}`);

      if (!res.ok) {
        if (res.status === 403) {
          toast({
            title: "Oh-oo",
            description: "You are not authorized to edit",
          });
        } else {
          toast({
            title: "Oh-oo",
            description: "Unable to load post",
          });
        }
        return;
      }

      const responce = await res.json();
      setPost(responce);
    };
    if (slug) fetchPost();
  }, [slug]);

  const savePost = async (data) => {
    // don't use the newly generated slug for the API path — use the original post slug
    const pathSlug = post?.slug || slug;
    const {
      title,
      slug: newSlug,
      ogImage,
      excerpt,
      metaDescription,
      content,
      keywords,
      status,
    } = data;

    const res = await fetch(`/api/v1/update/${pathSlug}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title,
        // include the new slug in the payload if you want the server to update it
        ...(newSlug ? { slug: newSlug } : {}),
        ogImage,
        excerpt,
        metaDescription,
        content,
        keywords,
        status,
      }),
    });

    if (!res.ok) {
      throw new Error("Post Updating Error");
    }
  };

  if (!post) {
    return <></>;
  }
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold pb-3">Create A new Post</h2>
      <Editor initialData={post} onSave={savePost} />
    </div>
  );
}
