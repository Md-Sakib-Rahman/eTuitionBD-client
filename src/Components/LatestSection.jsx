  import React, { useContext, useEffect, useState } from 'react'
  import MinimalCard from './MinimalCard'
import { AuthContext } from '../Context/AuthContextProvider'
import useAxiosSecure from '../AxiosInstance/AxiosSecureInstance'
import axios from 'axios'

  const LatestSection = ({title}) => {
    const {userData} = useContext(AuthContext)
    const [posts, setPostsData] = useState([])
    useEffect(()=>{
      const getRecentPost = async ()=>{
        try{
          const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/all-posts`)
          console.log(result.data)
          if(result){
            if(result.data.length > 4) setPostsData(result.data.slice(0, 4))
          else setPostsData(result.data)
          }
          else setPostsData([])
          
        } catch(err){
          console.log(err)
        }
      }
      getRecentPost()
    },[])
    return (
      <div>
        <h2 className='text-2xl font-bold mb-10'>{title}</h2>
        <div className='grid grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 overflow-hidden'>
          {
            posts.map((post)=> <MinimalCard key={post._id} post={post}/> )
          }
          
        </div>
      </div>
    )
  }

  export default LatestSection
