import getSingleUser from "@/app/actions/getSingleUser";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserDetails({ params }) {
  const { slug } = await params;
  console.log(slug);

  const user = await getSingleUser(slug);
  if (!user) notFound();
  return (
    <div className="flex flex-col gap-4 justify-center">
      <UserProfile user={user} />
      <UserPost posts={user.Post} />
    </div>
  );
}

const UserProfile = ({ user }) => {
  return (
    <div className="flex justify-center">
      <div className="text-center flex justify-center gap-8 items-center ">
        <Image width={80} height={80} alt={user.username} src={user.image} />
        <div>
          <h1>{user.name}</h1>
          <p>@{user.username}</p>
          <p>
            Joint On{" "}
            {new Date(user.createdAt).toLocaleDateString("en", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

const UserPost = ({ posts }) => {
  if (posts.length <= 0) {
    return <div>No Post Created</div>;
  }
  return (
    <div className="flex flex-col gap-3 pt-10">
      {posts.map((post, idx) => {
        return (
          <Link
            className="flex flex-row gap-4 bg-zinc-800/40 rounded px-2 items-center py-2 mx-auto w-10/12"
            href={`/blog/${post.slug}`}
          >
            <Image
              className="w-36 h-20"
              src={post.thumbnail}
              width={100}
              height={60}
              alt={post.title}
            ></Image>
            <div>
              <h3 className="text-gray-300 font-bold text-lg">{post.title}</h3>
              <p className="text-gray-400 ">
                {post.excerpt.substring(0, 20)}...
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
