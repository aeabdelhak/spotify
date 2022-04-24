import React from "react";
import TheLink from "next/link";
interface props {
  href: string;
  onMouseEnter?:Function
  onMouseLeave?:Function
  children?: any;
  className?: string;
  passHref?: boolean;
}

export default function Link(props: props) {
  return (
    <TheLink href={props.href} passHref={props?.passHref}>
      <a onMouseEnter={()=>{props.onMouseEnter&&props.onMouseEnter()}} onMouseLeave={()=>{props.onMouseLeave&&props.onMouseLeave()}} className={props?.className}>{props.children}</a>
    </TheLink>
  );
}
