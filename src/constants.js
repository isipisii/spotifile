import { FaUser } from "react-icons/fa";
import { TbMicrophone2 } from "react-icons/tb";
import { BsMusicNoteList } from "react-icons/bs";
import { RiPlayList2Fill } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";

export const navItems = [
  { linkName: "Profile", icon: <FaUser />, href: "/" },
  { linkName: "Top Artists", icon: <TbMicrophone2 />, href: "/top-artists" },
  { linkName: "Top Tracks", icon: <BsMusicNoteList />, href: "/top-tracks" },
  { linkName: "Recent", icon: <AiOutlineClockCircle/>, href: "/recent" },
  { linkName: "Playlists", icon: <RiPlayList2Fill />, href: "/playlists" },
];
