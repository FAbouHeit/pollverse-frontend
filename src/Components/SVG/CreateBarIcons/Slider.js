import React from 'react'

export default function Slider({size, active}) {
    const width = size || 50;
    const height = width;
    const color = active ? "#fff" :"#fff";
  return (
    <svg width={width} height={height} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="47" height="47" rx="5.5" stroke={color} strokeWidth="3"/>
        <path d="M45 24H5V26H45V24Z" fill={color}/>
        <path d="M15 31C18.3137 31 21 28.3137 21 25C21 21.6863 18.3137 19 15 19C11.6863 19 9 21.6863 9 25C9 28.3137 11.6863 31 15 31Z" fill={color}/>
    </svg>
  )
}
