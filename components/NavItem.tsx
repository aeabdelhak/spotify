import { AnimatePresence } from "framer-motion";
import React, { Component, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "./Link";

import Button from "./Button";

type Props = {
  inactiveIcon?: JSX.Element;
  activeIcon?: JSX.Element;
  name: string;
  href: string;
  activeOn: string ;
  path: string | undefined;
};

type State = {
  render: boolean;
  showName: boolean;
};

export default function NavItem(props: Props) {


    return (

        <Link
          href={props.href}
          className={`${
            props.path==props.activeOn
              ? " text-primary "
              : "dark:text-zinc-400 text-zinc-600"
          } group capitalize flex  flex-col z-10 relative !cursor-pointer  items-center justify-center p-3    `}
        >
            {props.name}
            <div className={`h-1 ${props.path==props.activeOn ? 'w-full' :'group-hover:w-3 w-0 ' }  rounded-t transition-all z-0  bg-primary`}></div>

        </Link>

    );

}
