import {  motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import useIsMounted from "../hooks/useIsMounted";

type props = {
  disabled?: boolean;
  icon?: JSX.Element;
  children?: any;
  onClick?: Function;
  onMouseEnter?: Function;
  
  className?: string;
  loading?: boolean;
  useDiv?: boolean;
  usePadding?: boolean;
};

export default function Button(props: props) {
  const [loading, setloading] = useState(false);
  const isMounted = useIsMounted()
  async function onclick() {
    setloading(true);
    if (props.onClick) {
      if (typeof props.onClick == "function") await props?.onClick();
    }
    if(isMounted())
    setloading(false);
  }




  if (props.useDiv)
    return (
      <div
        onClick={() => !props.disabled && onclick()}
        className={`${props.usePadding && "px-4 py-2 "} ${
          props.className
        } ' relative cursor-pointer   z-0 active:scale-95 font-medium duration-75 transition-all appearance-none outline-none '`}
      >
        <div
          className={`flex  z-0 justify-center transition-all w-full items-center gap-4 ${
            (props.loading || loading) && "opacity-0"
          }`}
        >
          {props?.icon}
          {props?.children}
        </div>

        {(props.loading || loading) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute z-10  inset-0 w-full h-full flex justify-center items-center "
          >
            <div className=" animate-spin">
              <AiOutlineLoading />
            </div>
          </motion.div>
        )}
      </div>
    );
  return (
    <button
      disabled={props.disabled}
      onClick={onclick}
      onMouseEnter={()=>props.onMouseEnter && props.onMouseEnter() }
      className={`${props.usePadding && "px-4 py-2 "} ${
        props.className
      } ' relative  z-0 active:scale-95 font-medium transform transition-all appearance-none outline-none '`}
    >
      <div
        className={`flex  z-0 justify-center transition-all items-center gap-2 ${
          (props.loading || loading) && "opacity-0"
        }`}
      >
        {props?.icon}
        {props?.children}
      </div>

      {(props.loading || loading) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute z-10  inset-0 w-full h-full flex justify-center items-center "
        >
          <div className=" animate-spin">
            <AiOutlineLoading />
          </div>
        </motion.div>
      )}
    </button>
  );
}
