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
    <div className="h-[100vh] w-[100vw] bg-[#121212] flex items-center justify-center">
      <div className="flex items-center flex-col justify-center gap-12">
        <div className="flex items-center gap-4 w-full">
          <h1 className="text-green-500 font-bold text-dynamic">Spotifile</h1>
          <img src="/images/spotifylogo.png" alt="logo" className="w-[60px] md:w-[90px]"/>
        </div>
        <button
          onClick={() => signIn("spotify")}
          className="font-semibold text-white text-sm md:text-base rounded-full hover:bg-green-500 bg-green-600 py-3 px-6"
        >
          Sign in with Spotify
        </button>
      </div>
    </div>
  );
};

export default SignIn;
