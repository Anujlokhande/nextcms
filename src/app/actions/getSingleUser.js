import { prisma } from "@/lib/prisma";

export default async function getSingleUser(username) {
  console.log(username);

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      name: true,
      image: true,
      email: true,
      createdAt: true,
      username: true,
      Post: {
        select: {
          title: true,
          slug: true,
          thumbnail: true,
          excerpt: true,
        },
      },
    },
  });

  if (!user) {
    console.error("User Not Found");
    return null;
  }

  return user;
}
