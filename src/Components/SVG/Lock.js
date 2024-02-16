import React from 'react'

export default function Lock({size}) {
    const width = size || 50;
    const height = width;
  return (
    <svg width={width} height={height} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    < path fill-rule="evenodd" clip-rule="evenodd" d="M14 26.8122V21.3333C14 11.3922 22.0589 3.33331 32 3.33331C41.9411 3.33331 50 11.3922 50 21.3333V26.8122C52.9728 27.0344 54.9086 27.5946 56.3235 29.0098C58.6667 31.353 58.6667 35.1242 58.6667 42.6666C58.6667 50.209 58.6667 53.9802 56.3235 56.3234C53.9803 58.6666 50.2091 58.6666 42.6667 58.6666H21.3334C13.7909 58.6666 10.0197 58.6666 7.67652 56.3234C5.33337 53.9802 5.33337 50.209 5.33337 42.6666C5.33337 35.1242 5.33337 31.353 7.67652 29.0098C9.09153 27.5946 11.0274 27.0344 14 26.8122ZM18 21.3333C18 13.6013 24.2681 7.33331 32 7.33331C39.732 7.33331 46 13.6013 46 21.3333V26.6762C44.9787 26.6666 43.8707 26.6666 42.6667 26.6666H21.3334C20.1293 26.6666 19.0214 26.6666 18 26.6762V21.3333ZM21.3334 45.3333C22.8061 45.3333 24 44.1394 24 42.6666C24 41.1938 22.8061 40 21.3334 40C19.8606 40 18.6667 41.1938 18.6667 42.6666C18.6667 44.1394 19.8606 45.3333 21.3334 45.3333ZM32 45.3333C33.4728 45.3333 34.6667 44.1394 34.6667 42.6666C34.6667 41.1938 33.4728 40 32 40C30.5272 40 29.3334 41.1938 29.3334 42.6666C29.3334 44.1394 30.5272 45.3333 32 45.3333ZM45.3334 42.6666C45.3334 44.1394 44.1395 45.3333 42.6667 45.3333C41.1939 45.3333 40 44.1394 40 42.6666C40 41.1938 41.1939 40 42.6667 40C44.1395 40 45.3334 41.1938 45.3334 42.6666Z" fill="#0F0CC6"/>
    </svg>

  )
}
