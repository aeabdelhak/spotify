import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Flex from "./Flex";
import NavItem from "./NavItem";
import data from "../jsons/data.json";

export default function Navbar() {
  const router = useRouter();
  const [dark, setdark] = useState<boolean>();
  const [shadow, setshadow] = useState<boolean>(false);
  const { genres } = data;

  
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      onscroll();
      window.addEventListener("scroll", onscroll);
    }

    return () => {};
  }, []);

  function onscroll() {
    window.scrollY > 30 ? setshadow(true) : setshadow(false);
  }

  if(router.pathname=='/login') return null
  return (
    <Flex
      center
      className={`${
        (shadow && "shadow-lg backdrop-blur bg-zinc-900") || "shadow-none"
      }  h-16 sticky  overflow-x-auto whitespace-nowrap !bg-opacity-90 duration-200 top-0 z-50 `}
    >
      {genres.flatMap((each) => (
        <NavItem
          key={each}
          name={each}
          href={`/${each}`}
          activeOn={`${each}`}
          path={router.query?.genre!?.toString()}
        />
      ))}
    </Flex>
  );
}
