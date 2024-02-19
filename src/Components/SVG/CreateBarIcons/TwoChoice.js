import React from 'react'

export default function TwoChoice({size, active}) {
    const width = size || 50;
    const height = width;
    const color = active ? "#fff" :"#fff";
  return (
    <svg width={width} height={height} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="47" height="47" rx="5.5" stroke={color} strokeWidth="3"/>
        <path d="M15 25C17.7614 25 20 22.7614 20 20C20 17.2386 17.7614 15 15 15C12.2386 15 10 17.2386 10 20C10 22.7614 12.2386 25 15 25Z" fill={color}/>
        <path d="M15 35C17.7614 35 20 32.7614 20 30C20 27.2386 17.7614 25 15 25C12.2386 25 10 27.2386 10 30C10 32.7614 12.2386 35 15 35Z" fill={color}/>
        <rect x="19" y="19" width="21" height="2" fill={color}/>
        <rect x="19" y="29" width="21" height="2" fill={color}/>
    </svg>


  )
}
