import React from 'react'
import Header from '../components/Landing/Header'
import Step from '../components/Landing/Step'
import Description from '../components/Landing/Description'
import GenerateBtn from '../components/Landing/GenerateBtn'
import Footer from '../components/Landing/Footer'
import Testimonials from '../components/Landing/Testimonials'

export default function LandingPage() {
  return (
    <div>
      <Header/>
      <Step/>
      <Description/>
      <Testimonials/>
      <GenerateBtn/>
      <Footer/>
    </div>
  )
}
