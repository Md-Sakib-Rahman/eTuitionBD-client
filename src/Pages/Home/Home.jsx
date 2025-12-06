import React from 'react'
import Banner from './Banner/Banner'
import LatestSection from '../../Components/LatestSection'
import LatestTutorSection from '../../Components/LatestTutorSection'
import HowItWorks from './Howitworks/Howitworks'
import WhyChooseUs from './WhyChooseUs/WhyChoseUs'

const Home = () => {
  return (
    <div className='mb-10'>
      <Banner/>
      <LatestSection title="Latest Tuition Posts" />
      <LatestTutorSection title="Latest Tutor Posts" />
      <HowItWorks/>
      <WhyChooseUs/>
    </div>
  )
}

export default Home
