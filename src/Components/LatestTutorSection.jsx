import React, { useEffect, useState } from 'react'
import TutorCard from './TutorCard'
import axios from 'axios'

const LatestTutorSection = ({title}) => {
   
      const [tutors, setTutorsData] = useState([])
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
            
          } catch(err){
            console.log(err)
            setTutorsData([])  
          }
        }
        getRecentPost()
      },[])
  
  return (
    <div>
      <h2 className='text-2xl font-bold mb-10'>{title}</h2>
      <div className='grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 overflow-hidden'>
        {
          tutors.map((tutor) => <TutorCard tutor={tutor} />)
        }
        
      </div>
    </div>
  )
}

export default LatestTutorSection
