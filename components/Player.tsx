import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atomes/TrackId";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

export default function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [volume, setvolume] = useState(50)
  const [currentTrackId, setcurrentTrackId] =useRecoilState(currentTrackIdState);
  const [isPlaying, setisPlaying] = useRecoilState(isPlayingState);
  const songInfo=useSongInfo()


const fetchCurrent=()=>{
    if(!songInfo){
        spotifyApi.getMyCurrentPlayingTrack().then((data)=>{
            setcurrentTrackId(data.body?.item?.id as never)
        })
        spotifyApi.getMyCurrentPlaybackState().then((data)=>{
            setisPlaying(data.body.is_playing)
        })
    }
}

  useEffect(() => {
    if(spotifyApi.getAccessToken() && !currentTrackId){
        fetchCurrent()
        setvolume(50)
    }
  
    return () => {
      
    }
  }, [currentTrackId,spotifyApi,session])
  

  return <div className="sticky bottom-0 h-20 w-full">
      {songInfo?.album?.images?.[0].url}
  </div>;
}
