import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import spotifyApi from '../lib/spotify';


function useSpotify() {
    const { data: session, status } = useSession()
    useEffect(() => {
        if (session) {
            if (session?.error === 'refreshAccessTokenError') {
                signIn('spotify')
            }
            const user: any = session.user
            spotifyApi.setAccessToken(user?.accessToken)
        }

    }, [session])
    return spotifyApi

}



export default useSpotify
