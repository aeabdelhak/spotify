import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atomes/TrackId";
import useSpotify from "../hooks/useSpotify";
import { milToMin } from "../lib/milToMin";
import Flex from "./Flex";
import Grid from "./Grid";

export default function Track(props: any) {
  const spotifyApi = useSpotify();
  const [artists, setartists] = useState<any>([]);
  const [isOn, setisOn] = useState<boolean>(false);
  const [currentTrackId, setcurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setisPlaying] = useRecoilState(isPlayingState);

  useEffect(() => {
    const artists: any = [];
    props.artists?.map((each: any) => artists.push(each.name));
    setartists(artists);
    return () => {

    };
  }, []);

  function play() {
    spotifyApi.play({
        uris: [props.uri],
      });
      
    setcurrentTrackId(props.id);
    setisPlaying(true);
    setisOn(true)
  }
  useEffect(() => {
   setisOn(currentTrackId==props.id)
  
    return () => {
      
    }
  }, [currentTrackId])
  
  return (
    <Flex
      onClick={()=>play()}
      align="items-center"
      className={` p-2 gap-2  text-white text-xs bg-gradient-to-tr hover:to-neutral-800 from-neutral-900  border rounded-lg  hover:shadow-emerald-700 transition-all hover:shadow cursor-pointer shadow-xl to-zinc-900 ${
        isOn ? "border-emerald-500" : "border-zinc-800"
      }`}
    >
      {props.index + 1}
      <img
        src={props.album?.images[0]?.url}
        className="h-10 w-10 object-cover rounded  "
        alt=""
      />
      <Grid className=" grow gap2 grid-cols-4">
        <Flex direction="flex-col" className="flex">
          <b>{props.name}</b>
          <p className="text-zinc-500 text-[8pt]">{artists?.join(" - ")}</p>
        </Flex>
        <Flex align="items-center" className="text-zinc-500 truncate">
          {props.album?.name}
        </Flex>
        <Flex align="items-center" className="text-zinc-500 truncate">
          {props.album?.release_date}
        </Flex>
        <Flex
          justify="justify-end"
          align="items-center"
          className="text-zinc-500"
        >
          {milToMin(props?.duration_ms)}
        </Flex>
      </Grid>
    </Flex>
  );
}
