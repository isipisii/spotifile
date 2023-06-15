"use client";
import { navItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NavBar = () => {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  return (
    <>
      {pathname !== "/sign-in" && (
        <nav
          className="fixed from-[#0000009a] to-[#000000] bg-gradient-to-b w-[100vw] bottom-0 flex-start 
          items-center justify-center
          md:left-0 md:h-[100vh] md:w-auto z-10"
        >
          <div className="w-full flex flex-row md:flex-col ">
            <div className="hidden md:flex flex-col items-center gap-2 py-6 px-4">
              <h1 className="text-green-500 font-bold">
                Spotifile
              </h1>
              <div className="flex gap-1">
                <p className="text-white text-[.4rem]">Powered by Spotify</p>
                <img src="/images/spotifylogo.png" alt="logo" className="w-[10px]"/>
              </div>
            </div>
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={`w-full ${
                  isActive(item.href) ? "bg-[#ffffff11]" : null
                } flex flex-col items-center py-3 md:px-3 gap-1 hover:bg-[#ffffff11]`}
              >
                <p
                  className={` ${
                    isActive(item.href) ? "text-green-500" : "text-[#b3b1b1]"
                  } text-[1.5rem]`}
                >
                  {item.icon}
                </p>
                <p
                  className={`text-[.6rem] ${
                    isActive(item.href) ? "text-green-500" : "text-[#b3b1b1]"
                  }`}
                >
                  {item.linkName}
                </p>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
