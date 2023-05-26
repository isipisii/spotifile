"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
  }

  return (
    <div className="h-[100vh] w-[100vw] bg-black flex items-center justify-center">
      <button
        onClick={() => signIn("spotify")}
        className="font-semibold text-white rounded-full bg-green-600 py-3 px-6"
      >
        Sign in with Spotify
      </button>
    </div>
  );
};

export default SignIn;
