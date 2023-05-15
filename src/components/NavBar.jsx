"use client";
import { navItems } from "@/constants";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <>
      {session && (
        <nav
          className="fixed from-[#000000c3] to-[#000000] bg-gradient-to-t w-[100vw] bottom-0 flex-start 
      items-center justify-center
      md:left-0 md:h-[100vh] md:w-auto"
        >
          <div className="w-full flex flex-row md:flex-col ">
            <h1 className="text-green-500 font-bold px-4 py-6 hidden md:block">
              Spotifile
            </h1>
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="w-full flex flex-col items-center py-3 md:px-3 gap-1 hover:bg-[#ffffff11]"
              >
                <p className="text-[#b3b1b1] text-[1.5rem]">{item.icon}</p>
                <p className="text-[#b3b1b1] text-[.6rem]">{item.linkName}</p>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
