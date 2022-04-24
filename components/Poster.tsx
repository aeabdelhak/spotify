import React, { useState } from "react";
import Flex from "./Flex";
import { AnimatePresence, motion } from "framer-motion";
interface props {
  id: number;
  title: string;
  year: string;
  runtime: string;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
}
export default function Poster(props: props) {
  const runtime = parseInt(props.runtime);
  const [isHovered, setisHovered] = useState(false);

  function timeConvert(n: number) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + ":" + rminutes;
  }

  return (
    <Flex
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
      direction="flex-col"
      className="text-white group relative  w-36 gap-2 rounded-t-lg  overflow-hidden"
    >
      <div className=" relative overflow-hidden">
        <img
          src={props.posterUrl}
          alt=""
          className="relative bg-gradient-to-tr from-zinc-800 to-zinc-900 shadow-xl   aspect-[2/3] rounded-lg ring ring-zinc-700 "
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ translateY: "100%" }}
              exit={{ translateY: "100%" }}
              animate={{ translateY: 0 }}
              transition={{ easings: "easeInOut", duration: 0.1 }}
              className=" p-2 absolute  flex h-fit w-full  transition-all   bg-opacity-80 backdrop-blur bottom-0  z-20   bg-zinc-800 text-[8pt] "
            >
              {props.title}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="   w-full truncate text-xs lg:hidden ">{props.title}</div>
      <div className="absolute right-0 top-0">
        <div className=" bg-emerald-500   px-2 py-1 rounded-l-lg truncate text-[8pt] ">
          {props.year}
        </div>{" "}
        <div className="  bg-red-500 backdrop-blur bg-opacity-50   px-2 py-1 rounded-l-lg truncate text-[8pt] ">
          {timeConvert(runtime)}
        </div>
      </div>
    </Flex>
  );
}
