import React from 'react'
import barbervid from './videos/barbervid.mp4'
import { Link } from 'react-router-dom'
function VideoBanner() {

  return (
    <div className='relative px-4 h-[75vh] bg-neutral-900 flex flex-col gap-6 justify-center items-center text-center'>
  <h2 
    className='z-20 text-[#FFD449] text-6xl font-bold tracking-tight drop-shadow-lg'
    style={{ fontFamily: "'Open Sans Condensed', sans-serif" }}
  >
    Get the Perfect Look with Top Bar
  </h2>

  <Link 
    to='/reservations' 
    className='bg-[#FFD449] text-neutral-900 text-xl px-6 py-3 font-semibold z-20 rounded-lg shadow-lg transition hover:brightness-110'
    style={{ fontFamily: "'Open Sans Condensed', sans-serif" }}
  >
    Book Now
  </Link>

  <video 
    className='absolute opacity-60 top-0 left-0 w-full h-full object-cover' 
    src={barbervid} 
    muted 
    loop 
    autoPlay
  ></video>
</div>
  )
}

export default VideoBanner