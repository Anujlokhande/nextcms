import AdminAllUsers from "@/components/admin/all-users";
import { authOptions } from "@/lib/auth";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";

export default async function AllUsers() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        You are not Authenticated
      </div>
    );
  }

  const adminCheck = await isAdmin(session);
  if (!adminCheck) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        You are not Authorized
      </div>
    );
  }
  return <AdminAllUsers />;
}
