import React from 'react'

export default function MultiChoice({size, active}) {
    const width = size || 50;
    const height = width;
    const color = active ? "#fff" :"#fff";
  return (
    <svg width={width} height={height} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="47" height="47" rx="5.5" stroke={color} strokeWidth="3"/>
        <path d="M15 20C17.7614 20 20 17.7614 20 15C20 12.2386 17.7614 10 15 10C12.2386 10 10 12.2386 10 15C10 17.7614 12.2386 20 15 20Z" fill={color}/>
        <path d="M15 30C17.7614 30 20 27.7614 20 25C20 22.2386 17.7614 20 15 20C12.2386 20 10 22.2386 10 25C10 27.7614 12.2386 30 15 30Z" fill={color}/>
        <path d="M15 40C17.7614 40 20 37.7614 20 35C20 32.2386 17.7614 30 15 30C12.2386 30 10 32.2386 10 35C10 37.7614 12.2386 40 15 40Z" fill={color}/>
        <rect x="19" y="14" width="21" height="2" fill={color}/>
        <rect x="19" y="24" width="21" height="2" fill={color}/>
        <rect x="19" y="34" width="21" height="2" fill={color}/>
    </svg>

  )
}
