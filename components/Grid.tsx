import React from 'react'
interface props{
    gap?:number
    row?:number
    children?:any
    className?:string
}
export default function Grid(props:props) {
  return (
    <div style={{gap:props.gap}} className={`grid ${props.className}`}>
        {props.children}
    </div>
  )
}
