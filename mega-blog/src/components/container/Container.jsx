import { Container } from '..'
import React, { Children } from 'react'

// accepts properties as a children
function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
      {children} </div> 

  )
}

export default Container
