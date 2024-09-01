import React from 'react'

export default function Header() {
  return (
    <div className='flex flex-row justify-end p-4 border-b'>
      <span className="font-bold text-4xl sm:text-3xl">
              Comunika {" "}
              <span className="text-colorOne">S</span>
              <span className="text-colorTwo">T</span>
              <span className="text-colorThree">E</span>
              <span className="text-colorFour">A</span>
              <span className="text-colorFive">M</span>
            </span>
      </div>
  )
}
