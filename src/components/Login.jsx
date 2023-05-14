"use client"
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className='h-[100vh] w-[100vw] bg-black flex items-center justify-center'>
        <button onClick={() => signIn('spotify')} className="font-semibold text-white rounded-full bg-green-600 py-3 px-6">Sign in with Spotify</button>
    </div>
  )
}

export default Login