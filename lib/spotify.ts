import SpotifyWebApi from 'spotify-web-api-node'
const scopes=[
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'streaming',
    'user-read-private',
    'user-library-read',
    'user-top-read',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-currently-played',
    'user-follow-read',
].join(',')
const params ={
    scopes:scopes,

}
const QueryParamsString=new URLSearchParams(params)
const LOGIN_URL=`https://accounts.spotify.com/authorize?${QueryParamsString.toString()}`
const spotifyApi=new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENTID,
    clientSecret: process.env.NEXT_PUBLIC_SECRET,
})
export default spotifyApi
export {LOGIN_URL}