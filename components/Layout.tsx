import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import React from "react";
import Flex from "./Flex";
import Navbar from "./Navbar";
import Player from "./Player";
import SideBar from "./SideBar";

interface props {
  children: any;
}
export default function Layout({ children }: props) {
  const { data: session, status } = useSession();

  return (
    <Flex direction="flex-row" gap={4} className="  flex h-screen ">
        <SideBar />
        <div className="  flex-col flex  flex-grow">
          {session && (
            <div className=" z-50 text-white text-[8pt] flex items-center gap-3 bg-black pr-3 pl-1 py-1 rounded-full   shadow shadow-zinc-600 fixed top-1 right-2">
              <img
                src={session.user?.image as string}
                className={
                  "h-8 w-8 object-cover rounded-full overflow-hidden bg-white"
                }
                alt=""
              />
              {session.user?.name}
            </div>
          )}

          {children}
      {/*     {session && (
          <Player/>)} */}
        </div>
  
    </Flex>
  );
}
