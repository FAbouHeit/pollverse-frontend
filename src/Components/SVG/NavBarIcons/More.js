import React from 'react'

export default function More({size, active}) {
  const color = active === true ? "#fff" : "#4478c7";
  const width = size || 30;
  const height = width;
  return (
    <svg width={width} height={height} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.5 18C25.5 18.8284 26.1716 19.5 27 19.5C27.8284 19.5 28.5 18.8284 28.5 18C28.5 17.1716 27.8284 16.5 27 16.5C26.1716 16.5 25.5 17.1716 25.5 18Z" stroke={color} strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.5 18C16.5 18.8284 17.1716 19.5 18 19.5C18.8284 19.5 19.5 18.8284 19.5 18C19.5 17.1716 18.8284 16.5 18 16.5C17.1716 16.5 16.5 17.1716 16.5 18Z" stroke={color} strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 18C7.5 18.8284 8.17158 19.5 9 19.5C9.82842 19.5 10.5 18.8284 10.5 18C10.5 17.1716 9.82842 16.5 9 16.5C8.17158 16.5 7.5 17.1716 7.5 18Z" stroke={color} strokeWidth="5.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>


  )
}
