"use client";

import { useSession, signOut } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  console.log(session)
  return (
    <>
      <h1>Home</h1>
      <h1>{session?.user?.name}</h1>
      <img src={session?.user?.image} alt={session?.user?.name} />
      <button onClick={() => signOut({callbackUrl: "/login"})}>Sign out</button>
    </>
  );
};

export default Home;
