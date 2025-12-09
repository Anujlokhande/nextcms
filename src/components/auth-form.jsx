import { Icons } from "@/components/Icons";
import { Anvil } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function AuthForm({ origin }) {
  const [loading, setLoading] = useState(false);
  const onSignin = async () => {
    try {
      setLoading(true);
      await signIn("google");
    } catch (error) {
      console.error(error.message);
      toast.warning("Oh-oh", {
        description: "Error While Signing in",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-center gap-2">
          <Anvil className="size-6 text-primary" />
          <h1 className="text-2xl font-bold">NextCMS</h1>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-center">
            {origin == "signup" ? "Sign Up" : "Sign In"}
          </h2>
          <p className="text-center text-sm text-muted-foreground">
            Welcome, by continuing with NextCMS signin, you'll be extraordinary
          </p>
        </div>

        <button
          onClick={onSignin}
          className="w-full flex items-center justify-center gap-2 bg-card border border-input px-4 py-2.5 rounded-lg hover:bg-accent/5 transition text-foreground font-medium"
        >
          <Icons.GoogleLogo />
          <span>
            {loading
              ? "Loading"
              : origin == "signup"
              ? "Sign Up"
              : "Sign in with Google"}
          </span>
        </button>
        {origin === "signup" ? (
          <p className="text-sm text-gray-400 text-center">
            Already having an account?{" "}
            <Link className="underline" href="/sign-in">
              Sign In
            </Link>
          </p>
        ) : (
          <p className="text-sm text-gray-400 text-center">
            New to NextCMS?{" "}
            <Link className="underline" href="/sign-up">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
