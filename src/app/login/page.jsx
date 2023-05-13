"use client";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex items-center justify-center">
      <button onClick={() => signIn("spotify", { callbackUrl: "/" })} className="bg-green-600 text-white py-2 px-5 rounded-full" >
        Login with spotify
      </button>
    </div>
  );
};

export default Login;
