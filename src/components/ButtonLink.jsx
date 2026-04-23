import React from 'react'

const ButtonLink = ({title}) => {
  return (
    <button className="m-3 p-2 relative transition duration-300 hover:text-green-600 after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 cursor-pointer">{title}</button>
  )
}

export default ButtonLink
 