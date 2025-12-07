import { prisma } from "@/lib/prisma";
import { config } from "../static/config";

export async function getAllPosts({ page, category }) {
  const postToShow = config.perPage;
  let query = {
    take: postToShow,
    skip: postToShow * (page - 1),
    where: {
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
        ...(category && { catSlug: category }),
      },
    }),
  ]);

  return { posts: posts, count: count };
}
