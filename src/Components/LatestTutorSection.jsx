import React, { useEffect, useState } from 'react'
import TutorCard from './TutorCard'
import axios from 'axios'
import LoadingSpinner from './GlobalLoader'

const LatestTutorSection = ({title}) => {
   
      const [tutors, setTutorsData] = useState([])
      const [isloading, setIsLoading] = useState(true)
  useEffect(()=>{
        const getRecentPost = async ()=>{
          try{
            const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/all-tutors`)
            
             
            const dataArray = result.data.tutors || result.data || [];

            console.log("Fetched Data:", dataArray); // Debugging

            if(Array.isArray(dataArray)){
               if(dataArray.length > 4) {
                 setTutorsData(dataArray.slice(0, 4))
               } else {
                 setTutorsData(dataArray)
               }
            } else {
               setTutorsData([])
            }
            setIsLoading(false)
          } catch(err){
            console.log(err)
            setTutorsData([])  
          }
        }
        getRecentPost()
      },[])
  
  if (isloading) {
    return <div className="min-h-screen flex justify-center items-center ">
        <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  }
  return (
    <div className=' max-w-[1280px] mx-auto'>
      <h2 className='text-2xl text-center font-bold mb-10 mt-10'>{title}</h2>
      <div className='grid grid-cols-3 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1  '>
        {
          tutors.map((tutor) => <TutorCard tutor={tutor} />)
        }
        
      </div>
    </div>
  )
}

export default LatestTutorSection
