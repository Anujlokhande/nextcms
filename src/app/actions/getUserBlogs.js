import { prisma } from "@/lib/prisma";
import { config } from "../static/config";

export async function getUserBlogs({ page, category, userId }) {
  const postToShow = config.perPage;
  let query = {
    take: postToShow,
    skip: postToShow * (page - 1),
    where: {
      authorId: userId,
      ...(category && {
        catSlug: {
          equals: category,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
  };
  //   const posts = await prisma.post.findMany(query);
  //   const count = await prisma.post.count({
  //     where: {
  //       ...(category && { catSlug: category }),
  //     },
  //   });

  const [posts, count] = await prisma.$transaction([
    prisma.post.findMany(query),
    prisma.post.count({
      where: {
        authorId: userId,
        ...(category && { catSlug: category }),
      },
    }),
  ]);

  return { posts: posts, count: count };
}
