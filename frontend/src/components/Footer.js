import React from 'react'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="relative bg-black text-neutral-100 px-6 py-10 ">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
 
    <div className="flex flex-col items-center md:items-start gap-4">
      <img src={logo} alt="Barbershop Logo" className="w-36" />
      <p className="text-sm text-neutral-400 text-center md:text-left">
        Elevating grooming standards since 2023. Welcome to the future of style.
      </p>
    </div>

   
    <div className="flex flex-col items-center gap-2 text-sm tracking-wide font-medium">
      <p className="uppercase text-yellow-500 text-lg font-bold mb-2">Quick Links</p>
      <Link to="/reservations" className="hover:text-yellow-500 transition">Make A Reservation</Link>
      <Link to="/contact" className="hover:text-yellow-500 transition">Contact Us</Link>
      <Link to="/about" className="hover:text-yellow-500 transition">About Us</Link>
      <Link to="/team" className="hover:text-yellow-500 transition">Our Team</Link>
      <Link to="/services" className="hover:text-yellow-500 transition">Services</Link>
    </div>
    <div className="flex flex-col items-center gap-4 ">
      <p className="uppercase text-yellow-500 text-lg font-bold">Stay Connected</p>
      <div className="flex gap-4">
        <a href="http://facebook.com/" target="_blank"> <img className="w-6 hover:scale-125 transition-transform" src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-512.png" alt="Facebook" /></a>
       <a href='https://www.instagram.com/' target='_blank'>
       <img className="w-6 hover:scale-125 transition-transform" src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png" alt="Instagram" />

       </a>
       <a href='https://x.com/' target='_blank'>
       <img className="w-6 hover:scale-125 transition-transform" src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter3_colored_svg-512.png" alt="Twitter" />

       </a>
      </div>
      <input
        type="email"
        placeholder="Subscribe to updates"
        className="bg-neutral-800 text-sm px-3 py-2 rounded-md w-full md:w-56 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  </div>

 
  <div className="text-center text-neutral-500 text-sm mt-12 border-t border-neutral-700 pt-6">
    © 2025 Billy’s Barber. All rights reserved.
  </div>
</footer>
  )
}

export default Footer