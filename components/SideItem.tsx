import { signOut } from "next-auth/react";
import React from "react";
import Flex from "./Flex";
import Link from "./Link";


type Props = {
  icon?: JSX.Element;
  onClick?:Function
  name: string;
  href?: string;
  activeOn?: string ;
  path?: string | undefined;
};

type State = {
  render: boolean;
  showName: boolean;
};

export default function SideItem(props: Props) {

if(props.onClick)
    return (

        <button
        onClick={()=>props.onClick&&props.onClick()}
          className={`${
            props.path==props.activeOn
              ? " text-white "
              : "dark:text-zinc-400 text-zinc-600"
          } group capitalize relative flex items-center gap-[10px]  duration-75 transition-all px-2 py-1  font-normal hover:text-white`}
        >
            
     
         {props.icon}
          {props.name}
  

            <div className={`w-1 ${props.path==props.activeOn ? 'h-full' :'group-hover:h-3 h-0 ' }  absolute right-0 rounded transition-all z-0  bg-primary`}></div>

        </button>

    );
    return (

        <Link
          href={props?.href || ''}
          className={`${
            props.path==props.activeOn
              ? " text-white "
              : "dark:text-zinc-400 text-zinc-600"
          } group capitalize relative flex items-center gap-[10px]  duration-75 transition-all px-2 py-1  font-normal hover:text-white`}
        >
            
     
         {props.icon}
          {props.name}
  

            <div className={`w-1 ${props.path==props.activeOn ? 'h-full' :'group-hover:h-3 h-0 ' }  absolute right-0 rounded transition-all z-0  bg-primary`}></div>

        </Link>

    );

}
