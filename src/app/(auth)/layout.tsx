import React from 'react'

function AuthLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='back h-full w-screen flex items-center justify-center bg-[#f4f6f6]'>
      {/* <div className='back'> */}
      {children}
      {/* </div> */}
      </div>
  )
}

export default AuthLayout