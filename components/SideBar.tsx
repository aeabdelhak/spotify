import React, { useEffect, useState } from "react";
import { AiFillHome, AiOutlineHeart, AiOutlineHome, AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";
import { MdOutlineLibraryAdd, MdOutlineLibraryMusic, MdRssFeed } from "react-icons/md";
import Button from "./Button";
import Flex from "./Flex";
import SideItem from "./SideItem";
import { useRouter } from 'next/router'
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";

export default function SideBar() {
    const router= useRouter()
   const{data:session,status}= useSession()
const spotifyApi=useSpotify()

   const [playlists, setplaylists] = useState<any>([])

useEffect(() => {
  if(spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists().then((data)=>{
          setplaylists(data.body?.items)
      })
  }

  return () => {
    
  }
}, [session])
if(!session) return null

  return (
    <Flex
      shrink_0
      direction="flex-col"
      gap={10}
      className=" hover: md:flex  p-4 text-sm sticky top-0  h-screen overflow-y-auto w-52 text-white shadow-xl"
    >
        <SideItem name="Log Out" onClick={signOut} path={'nevergonaSowUp'} icon={  <AiOutlineLogout />}  />
        <SideItem name="Home" path={router.pathname} href="/" activeOn="/" icon={  <AiOutlineHome />}  />
        <SideItem name="search" path={router.pathname} href="/search" activeOn="/search" icon={  <AiOutlineSearch />}  />
        <SideItem name="your libraries" path={router.pathname} href="/ yourlibraries" activeOn="/yourlibraries" icon={  <MdOutlineLibraryMusic />}  />

      <hr className="border-t-[0.1px] my-1 " />
      <SideItem name="create playlist" path={router.pathname} href="/createplaylist" activeOn="/createplaylist" icon={  <MdOutlineLibraryAdd />}  />
      <SideItem name="liked songs" path={router.pathname} href="/liked" activeOn="/liked" icon={  <AiOutlineHeart />}  />
      <SideItem name="your episodes" path={router.pathname} href="/yourepisodes" activeOn="/yourepisodes" icon={  <MdRssFeed />}  />

      <hr className="border-t-[0.1px] my-1 " />
      {playlists.map((playlist:any)=>(
      <SideItem name={playlist.name} key={playlist.id} path={router.query?.playlist as string || undefined } href={`/${playlist.id}`} activeOn={`${playlist.id}`}   />
      ))}


    </Flex>
  );
}
