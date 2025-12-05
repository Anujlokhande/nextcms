// "use client";
// import { useForm } from "react-hook-form";
// import dynamic from "next/dynamic";
// import "react-quill-new/dist/quill.snow.css";

// // SSR OFF
// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// export default function Editor() {
//   const { register, handleSubmit, Controller } = useForm();
//   const handleForm = (data) => {
//     console.log(data);
//   };
//   return (
//     <section>
//       <form onSubmit={handleSubmit(handleForm)}>
//         <input
//           {...register("title")}
//           placeholder="Enter the post title"
//           className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
//           type="text"
//         />
//         <Controller
//           name="content"
//           control={control}
//           render={({ field }) => (
//             <ReactQuill
//               theme="snow"
//               value={field.value}
//               onChange={field.onChange}
//               modules={{
//                 toolbar: [
//                   [{ header: "1" }, { header: "2" }, { header: "3" }],
//                   [{ size: [] }],
//                   ["bold", "italic", "underline", "strike"],
//                   [{ list: "ordered" }, { list: "bullet" }],
//                   ["link", "image", "code-block"],
//                 ],
//               }}
//               formats={[
//                 "header",
//                 "font",
//                 "size",
//                 "bold",
//                 "italic",
//                 "underline",
//                 "strike",
//                 "list",
//                 "bullet",
//                 "link",
//                 "image",
//                 "code-block",
//               ]}
//               className="bg-white text-black"
//             />
//           )}
//         />
//         <input
//           {...register("keywords")}
//           placeholder="Enter Keywords"
//           className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
//           type="text"
//         />
//       </form>
//       <button
//         type="submit"
//         className="bg-zinc-800 px-3 py-2 rounded cursor-pointer"
//       >
//         Save
//       </button>
//     </section>
//   );
// }

"use client";

import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { slugify } from "slugmaster";
import ImageUpload from "./ImageUpload";
import { useState } from "react";

// SSR OFF
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Editor({ onSave }) {
  const [ogImage, setOgImage] = useState("");
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      keywords: "",
      content: "",
    },
  });

  const handleForm = (data) => {
    const generatedSlug = slugify(data.title);

    onSave({ ...data, slug: generatedSlug, ogImage });
    // console.log("FORM DATA:", data);
  };

  return (
    <section className="space-y-4">
      {/* ----- FORM ----- */}
      <form
        id="postForm"
        onSubmit={handleSubmit(handleForm)}
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
        <ImageUpload returnImage={setOgImage} />
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
