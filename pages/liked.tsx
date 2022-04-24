import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useEffect, useId, useState } from "react";
import Flex from "../components/Flex";

import { shuffle } from "lodash";
import { getSession, signIn } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { motion } from "framer-motion";
import spotifyApi from "../lib/spotify";
import Track from "../components/Track";

const colors = [
  "from-emerald-900",
  "from-green-900",
  "from-sky-900",
  "from-blue-900",
  "from-indigo-900",
  "from-yellow-900",
  "from-red-900",
  "from-purple-900",
  "from-amber-900",
];

export default function LikedPage({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [color, setcolor] = useState<string>();
  const [changedHeight, setchangedHeight] = useState<boolean>(false);
  const [Height, setHeight] = useState<number>(0);
  const [playlist, setplaylist] = useState<any>();
  const spotifyApi = useSpotify();
  const main = useId();

  useEffect(() => {
    setcolor(shuffle(colors).pop());
  }, []);
  useEffect(() => {

      spotifyApi
        .getMySavedTracks()
        .then((data) => {
          setplaylist(data.body);
        })
        .catch((error) => console.log(error));
  }, [spotifyApi]);

  function onScroll() {
setchangedHeight(document?.getElementById(main)?.scrollTop! > 180  )
setHeight(document?.getElementById(main)?.scrollTop! <= 240 ? document?.getElementById(main)?.scrollTop! : 240  )

}
  useEffect(() => {
    if (typeof window != "undefined") {
      document?.getElementById(main)?.addEventListener("scroll", onScroll);
    }

    return () => {
      document?.getElementById(main)?.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Flex
      id={main}
      className=" overflow-y-auto h-screen  flex-col  "
      gap={4}
    >
      <motion.section
      initial={false}
      animate={{
         top: changedHeight ? -Height : 0 ,
         position: changedHeight ? "sticky" : 'relative',
         
      }}
      
      transition={{easings:'easeOut',duration:0.02}}
        style={{
          backgroundImage: `url(${playlist?.images[0]?.url})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height:320
        }}
        className={`  overflow-hidden shrink-0    top-0 `}
      >
        <div
          className={`flex  items-end space-x-7 bg-gradient-to-b opacity-95 to-zinc-900 p-2 gap-2  h-full ${color}`}
        >
          <Flex align="items-end" className="flex text-white gap-4 font-bold">
            <motion.img
            initial={false}
            animate={{
              width: changedHeight ? 60 : 128
            }}
              src={playlist?.images[0]?.url}
              className=" aspect-square  rounded object-cover"
              alt=""
            />
            <div className="flex flex-col text-[8pt]">
              <p>PLAYLIST</p>
              <motion.h1
                 initial={false}
                 animate={{
                   fontSize: changedHeight ? '12pt' : '24pt'
                 }}
                 
               className="">{playlist?.name}</motion.h1>
            </div>
          </Flex>
        </div>
      </motion.section>
      <section className="flex flex-col gap-2">
        {playlist?.tracks?.items?.flatMap((track: any, index: number) => (
          <Track key={track.track.id} {...track.track} index={index} />
        ))}
      </section>
    </Flex>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession({ req: ctx.req });

  return {
    props: {
      session,
    },
  };
}
