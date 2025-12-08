import Image from "next/image";
import Link from "next/link";

async function fectchAllUser() {
  const res = await prisma.user.findMany();
  return res;
}

export default async function AdminAllUsers() {
  const users = await fectchAllUser();

  return (
    <section className="p-8 flex flex-col gap-3">
      {users.map((user, idx) => {
        return (
          <Link
            href={`/user/${user.username}`}
            key={idx}
            className="flex gap-3 p-3 bg-gray-500/20 "
          >
            <Image
              className="size-20"
              src={user.image}
              width={50}
              height={50}
              alt={user.title}
            ></Image>
            <div className="space-y-2">
              <h2 className="font-bold">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-sm text-gray-400">{user.username}</p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
