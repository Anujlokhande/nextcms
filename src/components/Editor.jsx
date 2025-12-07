"use client";

import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { slugify } from "slugmaster";
import ImageUpload from "./ImageUpload";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";

// SSR OFF
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const schema = z.object({
  title: z
    .string()
    .min(10, { message: "Title must contain 10 or more characters" })
    .min(1, { message: "Title must not be empty" }),
  excerpt: z
    .string()
    .min(10, { message: "Please add some details in the excerpt" }),
  category: z.string().min(1, { message: "Please add a category" }),
  metaDescription: z.string().optional(),
  keywords: z
    .string()
    .min(1, { message: "Keywords should be there for SEO benefits" }),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export default function Editor({ onSave, initialData }) {
  const [ogImage, setOgImage] = useState("");
  const router = useRouter();
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      title: "",
      keywords: "",
      content: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      // console.log(initialData);

      setValue("title", initialData.title);
      setValue("content", initialData.content);
      setValue("excerpt", initialData.excerpt);
      // support both `category` and `catSlug` coming from the API
      setValue("category", initialData.category ?? initialData.catSlug);
      setValue("keywords", initialData.keywords);
      setValue("metaDescription", initialData.desc);
      setValue("status", initialData.status);
      // populate ogImage preview if available
      if (initialData.thumbnail) setOgImage(initialData.thumbnail);
    }
  }, [initialData]);

  const handleForm = (data) => {
    try {
      const generatedSlug = initialData
        ? initialData.slug
        : slugify(data.title);
      onSave({ ...data, slug: generatedSlug, ogImage });
      // use sonner API: first arg is the message, second is options
      toast.success("Success", {
        description: initialData ? "Blog Updated" : "Blog Was Published",
      });
      if (data.status == "PUBLISHED") {
        router.push(`/blog/${generatedSlug}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="space-y-4">
      {/* ----- FORM ----- */}
      <form
        id="postForm"
        onSubmit={handleSubmit(async (data) => {
          try {
            await schema.parseAsync(data);
            await handleForm(data);
          } catch (error) {
            console.error(error.message);
            // Defensive handling for validation errors
            // Zod errors usually expose `errors` (an array), but ensure we check before iterating
            if (error) {
              const errs = Array.isArray(error.errors)
                ? error.errors
                : error instanceof Error
                ? [{ message: error.message }]
                : [];

              if (errs.length) {
                errs.forEach((err) => {
                  toast.error("Error", {
                    description: err?.message || "Validation error",
                  });
                });
              }
            }
          }
        })}
        className="space-y-4"
      >
        <input
          {...register("title")}
          placeholder="Enter the post title"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              value={field.value}
              onChange={field.onChange}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { header: "3" }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image", "code-block"],
                ],
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "list",
                "link",
                "image",
                "code-block",
              ]}
              // className="bg-white text-black"
            />
          )}
        />
        <input
          {...register("excerpt")}
          placeholder="Enter excerpt"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        <input
          {...register("category")}
          placeholder="Enter Category"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        <h2 className="text-xl font-bold">SEO Data</h2>
        <ImageUpload returnImage={setOgImage} preLoadedImage={ogImage} />
        <input
          {...register("keywords")}
          placeholder="Enter Keywords"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        <input
          {...register("metaDescription")}
          placeholder="Enter Meta Description"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        <div className="flex gap-3">
          <select
            {...register("status")}
            className="font-bold bg-zinc-600 px-3 py-1 rounded-sm outline-none"
          >
            <option value="DRAFT">draft</option>
            <option value="PUBLISHED">published</option>
          </select>
          <button
            type="submit"
            className="bg-zinc-800 px-3 py-2 rounded cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>

      {/* ----- SUBMIT BUTTON OUTSIDE THE FORM ----- */}
    </section>
  );
}
