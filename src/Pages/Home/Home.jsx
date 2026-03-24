import React, { useContext } from 'react'
import Banner from './Banner/Banner'
import LatestSection from '../../Components/LatestSection'
import LatestTutorSection from '../../Components/LatestTutorSection'
import HowItWorks from './Howitworks/Howitworks'
import WhyChooseUs from './WhyChooseUs/WhyChoseUs'
import { AuthContext } from '../../Context/AuthContextProvider'

const Home = () => {
  
  return (
    <div className='mb-10'>
      <Banner/>
      <WhyChooseUs/>
      <HowItWorks/>
      <LatestSection title="Latest Tuition Posts" />
      <LatestTutorSection title="Latest Tutor Posts" />
    </div>
  )
}

export default Home
