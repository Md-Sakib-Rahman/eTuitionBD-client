import React from 'react'
import MinimalCard from './MinimalCard'

const LatestSection = ({title}) => {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-10'>{title}</h2>
      <div className='grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 overflow-hidden'>
        <MinimalCard/>
        <MinimalCard/>
        <MinimalCard/>
        <MinimalCard/>
      </div>
    </div>
  )
}

export default LatestSection
