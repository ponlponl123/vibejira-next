import React from 'react'

function NotFound() {
  return (
    <div className='flex min-h-full w-full flex-col gap-2 items-center justify-center'>
      <img src="/826102567795949599.webp" alt="9arm Hmm" />
      <h1 className='mt-2 font-bold text-lg'>Hmm...</h1>
      <pre>{"{status: 404, message: \"NotFound\"}"}</pre>
    </div>
  )
}

export default NotFound