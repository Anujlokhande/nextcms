"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoryFilter() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("cat") || "");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("cat", category);
    router.push(`/posts?${params.toString()}`);
  };
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="flex gap-3"
    >
      <Input
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        placeholder="Filter By Category"
        className="w-[300px]"
        type="text"
      />
      <Button type="submit">Filter</Button>
    </form>
  );
}
