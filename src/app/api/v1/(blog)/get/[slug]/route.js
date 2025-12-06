import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return NextResponse.json(
      { message: "Missing slug parameter" },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.findFirst({
      where: {
        slug: slug,
        status: "PUBLISHED",
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { message: "could not find the post" },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Error fetching post", error: error.message },
      { status: 500 }
    );
  }
}
