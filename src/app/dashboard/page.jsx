import { getAuthsession } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function Dashboard() {
  const session = await getAuthsession();
  if (!session) {
    return (
      <section className="flex w-full h-screen justify-center items-center">
        Not Authenticated
      </section>
    );
  }
  return (
    <section className="flex w-full h-screen justify-center items-center">
      Welcome back, {session.user.name}
    </section>
  );
}
