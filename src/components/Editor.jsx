"use client";

import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { slugify } from "slugmaster";
import ImageUpload from "./ImageUpload";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AiContent from "@/utils/ai-content";
import { fi } from "zod/v4/locales";
import { Sparkle, Sparkles } from "lucide-react";

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
  const ideaRef = useRef(null);
  const closeDialog = useRef(null);
  const quillRef = useRef(null);
  const [selectExist, setSelectExist] = useState(false);

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

  const handleGenerateUsingAI = async () => {
    try {
      const res = await AiContent({
        text: ideaRef.current.value,
        customInstructions: "Generate Content With Proper Facts",
        contentGen: true,
      });
      setValue("content", res);
    } catch (error) {
      console.error(error.message);
    } finally {
      closeDialog.current?.click();
    }
  };

  const handleRephrase = async () => {
    const selection = quillRef.current?.getEditor().getSelection();
    if (selection && selection.length > 0) {
      try {
        const selectedText = quillRef.current
          .getEditor()
          .getText(selection.index, selection.length);
        const res = await AiContent({
          text: selectedText,
          customInstructions: "Rewrite This Text",
          contentGen: false,
        });
        quillRef?.current
          .getEditor()
          .deleteText(selection.index, selection.length);
        quillRef?.current.getEditor().insertText(selection.index, res);
        setSelectExist(false);
      } catch (error) {
        console.error(error.message);
        toast.error("Uh-oh", {
          description: "Content Rephrasing Failed",
        });
      }
    } else {
      toast.error("Uh-oh", {
        description: "Please Select Some Text To Rephrase",
      });
    }
  };

  const handleSelectionChange = () => {
    const selection = quillRef.current?.getEditor().getSelection();
    // console.log(selection);
    setSelectExist(selection && selection.length > 0);
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
              ref={quillRef}
              onChangeSelection={handleSelectionChange}
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

        <Dialog>
          <DialogTrigger className="flex gap-2 items-center border-2 p-2 rounded">
            Generate content using AI <Sparkles />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                Give a brief on the type of content you want to generate
              </DialogDescription>
              <textarea
                ref={ideaRef}
                className="bg-zinc-800 p-2 rounded outline-none"
                rows={10}
              />
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleGenerateUsingAI}>Generate</Button>
              <DialogClose asChild ref={closeDialog}>
                <Button variant="ghost">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
          {/* <Button variant="outline">Rewite Using AI</Button> */}
        </div>
      </form>
      {selectExist && (
        <Button
          className="fixed bottom-10 right-10"
          variant="outline"
          onClick={handleRephrase}
        >
          Rewite Using AI <Sparkles></Sparkles>
        </Button>
      )}
      {/* ----- SUBMIT BUTTON OUTSIDE THE FORM ----- */}
    </section>
  );
}
