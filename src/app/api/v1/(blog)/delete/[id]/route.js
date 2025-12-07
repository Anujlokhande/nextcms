import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  //   const { id, status } = await request.json();
  //   if (!["DRAFT", "PUBLISHED", "ARCHIVED", "DELETE"].includes(status)) {
  //     return NextResponse.json({ message: "Invalid Status" }, { status: 400 });
  //   }

  const session = await getServerSession(authOptions);
  const checkAdmin = await isAdmin(session);

  const grabPost = await prisma.post.findUnique({ where: { id } });

  if (!grabPost) {
    return NextResponse.json({ message: "No Post Found" }, { status: 404 });
  }

  const isAuthor = grabPost.authorId == session.user.id;

  if (isAuthor || checkAdmin) {
    const deletedPost = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json(deletedPost, { status: 200 });
  }

  return NextResponse.json(
    { message: "Not Authorized To Delete" },
    { status: 403 }
  );
}
