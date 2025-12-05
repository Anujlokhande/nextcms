"use client";
import Editor from "@/components/Editor";

export default function Draft() {
  const savePost = async ({
    title,
    slug,
    ogImage,
    excerpt,
    metaDescription,
    content,
    category,
    keywords,
    status,
  }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/create`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          ogImage,
          excerpt,
          metaDescription,
          content,
          category,
          keywords,
          status,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("fetching error");
    }
  };
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold pb-3">Create A new Post</h2>
      <Editor onSave={savePost} />
    </div>
  );
}
