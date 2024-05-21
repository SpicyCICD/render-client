import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ReactLoading from 'react-loading';

const Landing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (

    <div >
      {loading ? (
        <div className='loadingContainer'>
        <ReactLoading 
          type={"bars"} 
          color={"green"} 
          height={'50px'} 
          width={'50px'} 
        />
        </div>
      ) : (
        <>
          <Navbar />
          <div className='mt-20'>
            Landing Page
          </div>

        </>
      )}
    </div>


  )
}

export default Landing