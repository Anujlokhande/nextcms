import AdminAllPosts from "@/components/admin/admin-all-posts";
import UserAllPosts from "@/components/admin/user-all-posts";
import { authOptions } from "@/lib/auth";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";

//getserverSessions can be only implemented if call is from browser
export default async function AllPosts({ searchParams }) {
  const params = await searchParams;
  console.log(params);

  const page = params.page || 1;
  const category = params.cat || null;

  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        You are not Authenticated
      </div>
    );
  }
  const admin = await isAdmin(session);
  if (!admin) {
    return <UserAllPosts page={page} category={category} user={session.user} />;
  }
  return <AdminAllPosts page={page} category={category} />;
}
