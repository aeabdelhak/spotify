import React, { HtmlHTMLAttributes, useEffect, useId } from 'react'
interface props{
    direction?:'flex-col'|'flex-row'
    align?:'items-start'|'items-end'|'items-center'|'items-baseline'|'items-stretch',
    justify?:'justify-start'|'justify-center'|'justify-between'|'justify-around'|'justify-evenly'|'justify-end'
    children?:any
    id?:any
    center?:boolean
    overFlow?:'x'|'y'
    grow?:boolean
    gap?:number
    shrink_0?:boolean
    wrap?:boolean
    className?:string
    onMouseEnter?:Function
    onMouseLeave?:Function
    onClick?:Function
    onScroll?:Function
    
}
export default function Flex(props:props) {


  
  return (
    <div id={props.id} onClick={()=>props.onClick && props.onClick()} onMouseEnter={()=>props?.onMouseEnter && props?.onMouseEnter()} onMouseLeave={()=>props?.onMouseLeave&&props?.onMouseLeave()} style={{gap:props.gap}} className={`flex ${props.align || ''} ${(props.overFlow=='x' && 'overflow-x-auto') || ''} ${(props.overFlow=='y' && 'overflow-y-auto')||''} ${props.grow ? 'grow':''} ${props.shrink_0 ? 'shrink-0':''} ${props.center ? 'justify-center items-center':''} ${props.direction || ''} ${(props.wrap && ' flex-wrap ')||''} ${props.justify || ''} ${props.className || ''} transition-all`}>
        {props.children}
        
    </div>
  )
}
