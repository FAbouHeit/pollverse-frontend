import React from 'react'

export default function NoEye({size}) {
    const width = size || 50;
    const height = width
  return (
    <svg width={width} height={height} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.56479 36.7435C14.3099 41.4608 22.5854 47.9997 32.0005 47.9997C41.4155 47.9997 49.6893 41.4608 54.4347 36.7435C55.6861 35.4995 56.3139 34.8752 56.7123 33.6536C56.9968 32.7821 56.9968 31.2179 56.7123 30.3464C56.3139 29.1248 55.6861 28.5005 54.4347 27.2563C49.6893 22.5389 41.4155 16 32.0005 16C22.5854 16 14.3099 22.5389 9.56479 27.2563C8.31237 28.5013 7.6861 29.1243 7.28746 30.3464C7.00314 31.2179 7.00314 32.7821 7.28746 33.6536C7.6861 34.8757 8.31237 35.4984 9.56479 36.7435Z" stroke="#4a4b5d" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M26.6665 32.0001C26.6665 34.9457 29.0542 37.3334 31.9998 37.3334C34.9454 37.3334 37.3332 34.9457 37.3332 32.0001C37.3332 29.0545 34.9454 26.6667 31.9998 26.6667C29.0542 26.6667 26.6665 29.0545 26.6665 32.0001Z" stroke="#4a4b5d" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="20.5815" y="56.0132" width="8" height="52" rx="4" transform="rotate(-144 20.5815 56.0132)" fill="#4a4b5d"/>
    </svg>

  )
}
