import { Anvil } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getAuthsession } from "@/lib/auth";
import SignOut from "./signout";

const tempUser = {
  username: "Anuj",
};

export default async function Navbar() {
  const session = await getAuthsession();

  return (
    <nav className="w-full bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <Anvil className="size-5" />
            <span className="font-extrabold text-lg">CMS</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Blogs
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
          </div>

          {session ? (
            <div className="flex items-center gap-3">
              <UserModalComponent user={session.user} />
            </div>
          ) : (
            <Link href="/sign-in" className="flex items-center gap-3">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

const UserModalComponent = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>User</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/user/${user.username}`}> Go To Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
