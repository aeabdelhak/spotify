import { useEffect } from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import React from 'react'
import useSpotify from './useSpotify';
import { currentTrackIdState } from '../atomes/TrackId';

export default function useSongInfo() {
    const spotifyApi = useSpotify();
    const [currentTrackId, setcurrentTrackId] = useRecoilState(currentTrackIdState);
    const [songInfo, setsongInfo] = useState<any>(null)
    useEffect(() => {
        (
            async () => {
                if (currentTrackId) {
                    const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, {
                        headers: { Authorisation: `Bearer ${spotifyApi.getAccessToken()}` }
                    }).then(res=>res.json())
                    
                    setsongInfo(trackInfo)
                }
            }
        )()

        return () => {

        }
    }, [spotifyApi, currentTrackId])

    return songInfo
}
