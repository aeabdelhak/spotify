import NextAuth from "next-auth"
import spotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token){
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.accessToken)
    const {body:refreshAccessToken}=await spotifyApi.refreshAccessToken();
return {
  ...token,accessToken:refreshAccessToken.access_token,
  accessTokenExpires:Date.now()+refreshAccessToken.expires_in*100,
  refreshToken:refreshAccessToken.access_token ?? token.refreshToken,

}

  } catch (error) {
    return {
      ...token,error:'refreshAccessTokenError'
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    spotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENTID,
      clientSecret: process.env.NEXT_PUBLIC_SECRET,
      authorization:LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret:process.env.JWT_SECRET,
  pages:{
    signIn:'/login'
  },
  callbacks:{
    async jwt({token,account,user}){
      if(account && user){
        return {
          ...token,accessToken:account.access_token,
          refreshToken:account.refresh_token,
          username:account.providerAccountId,
          accessTokenExpires:account.expires_at*1000,
        }
      }
      if(Date.now()<token.accessTokenExpires){
        return token
      }
      return await refreshAccessToken(token)
    },
    async session({session,token}){
      session.user.accessToken= token.accessToken
      session.user.refreshToken= token.refreshToken
      session.user.username= token.username
      
      return session
    }
  }
})