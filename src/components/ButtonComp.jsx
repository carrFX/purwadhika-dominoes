import React from 'react'

const ButtonComp = ({...props}) => {
    const {onClick, children, className} = props
  return (
        <button onClick={() => onClick()} className={`rounded-lg px-4 py2 ${className}`}>{children}</button>
  )
}

export default ButtonComp