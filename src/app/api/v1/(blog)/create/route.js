import { getAuthsession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getAuthsession();
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const {
    title,
    slug,
    ogImage,
    excerpt,
    metaDescription,
    content,
    category,
    keywords,
    status,
  } = body;
  if (!title || !content || !slug || !category || !session.user.id) {
    return NextResponse.json(
      { message: "Missing required fields: title, content, slug, category" },
      { status: 400 }
    );
  }

  const statusOfPost = status || "DRAFT";

  try {
    let categoryCheck = await prisma.category.findUnique({
      where: { slug: category },
    });

    if (!categoryCheck) {
      categoryCheck = await prisma.category.create({
        data: {
          title: category.charAt(0).toUpperCase() + category.slice(1),
          slug: category,
        },
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        thumbnail: ogImage || null,
        desc: metaDescription || null,
        keywords: keywords || null,
        excerpt: excerpt || null,
        authorId: session.user.id,
        catSlug: categoryCheck.slug,
        status: statusOfPost,
      },
    });
    console.log(categoryCheck);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Post creation error:", error);

    // Handle unique constraint violation on slug
    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      return NextResponse.json(
        { message: "A post with this slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Could not save post", error: error.message },
      { status: 500 }
    );
  }
}
