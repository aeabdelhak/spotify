import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Flex from "../components/Flex";
import { BsSpotify } from "react-icons/bs";
import Button from "../components/Button";
import { getProviders, signIn } from "next-auth/react"
export default function loginPage({providers}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Flex center grow className="  text-white">
        <Button onClick={()=>signIn('spotify',{ callbackUrl: '/' })}> 
          <Flex center direction="flex-col" gap={8} className="text-xs font-thin">
            <BsSpotify size={80} />
            Login with Spotify
          </Flex>
        </Button>
      </Flex>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const providers=await getProviders()
    return {
        props: {
            providers
        }
    }
}




