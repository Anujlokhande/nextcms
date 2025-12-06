import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth/next";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const resovedParams = await params;
  const { slug } = resovedParams;
  const body = await request.json();
  const {
    title,
    ogImage,
    excerpt,
    metaDescription,
    content,
    category,
    keywords,
    status,
  } = body;

  const session = await getServerSession(authOptions);
  console.log(session);
  const Admin = await isAdmin(session);
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    select: {
      authorId: true,
    },
  });
  if (!post) {
    return NextResponse.json({ message: "Post Not Found" }, { status: 404 });
  }

  const isAuthor = session.user.id === post.authorId;
  if (!Admin && !isAuthor) {
    return NextResponse.json({ message: "Not Authorized" }, { status: 403 });
  }

  try {
    const updatedPost = await prisma.post.update({
      where: {
        slug,
      },
      data: {
        title,
        content,
        thumbnail: ogImage,
        desc: metaDescription,
        keywords: keywords,
        excerpt: excerpt,
        authorId: session.user.id,
        catSlug: category,
        status: status,
      },
    });
    revalidateTag(slug);
    return NextResponse.json(
      { post: updatedPost, message: "Published" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: "failed to publish" }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  const resovedParams = await params;
  const { slug } = resovedParams;

  const session = await getServerSession(authOptions);
  const Admin = await isAdmin(session);

  const post = await prisma.post.findUnique({
    where: { slug },
  });
  if (!post) {
    return NextResponse.json({ message: "Post Not Found" }, { status: 404 });
  }

  const isAuthor = session.user.id === post.authorId;

  if (!Admin && !isAuthor) {
    return NextResponse.json(
      { message: "You Are Not Authorized To Edit" },
      { status: 403 }
    );
  }
  return NextResponse.json(post, { status: 200 });
}
