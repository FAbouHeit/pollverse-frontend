import React from 'react'

export default function Create({size, active}) {
    const color = active === true ? "#fff" : "#4478C7";
    const width = size || 30;
    const height = width;
  return (
    <svg width={width} height={height} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M17.875 13.8125H13.8125V17.875C13.8125 18.3219 13.4493 18.6875 13 18.6875C12.5507 18.6875 12.1875 18.3219 12.1875 17.875V13.8125H8.125C7.67569 13.8125 7.3125 13.4469 7.3125 13C7.3125 12.5531 7.67569 12.1875 8.125 12.1875H12.1875V8.125C12.1875 7.67812 12.5507 7.3125 13 7.3125C13.4493 7.3125 13.8125 7.67812 13.8125 8.125V12.1875H17.875C18.3243 12.1875 18.6875 12.5531 18.6875 13C18.6875 13.4469 18.3243 13.8125 17.875 13.8125ZM13 0C5.81994 0 0 5.8175 0 13C0 20.1825 5.81994 26 13 26C20.1801 26 26 20.1825 26 13C26 5.8175 20.1801 0 13 0Z" fill={color}/>
    </svg>

  )
}
