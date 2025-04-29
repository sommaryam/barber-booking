import React, { useEffect, useState } from 'react'
import scrollToTop from '../helpers/scrollToTop';

function Contact() {
  useEffect(() => {
    scrollToTop()
  },[])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

      const [message, setMessage] = useState(false)
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(true)
      };
    
      return (
        <div className="min-h-screen bg-neutral-950">

  <div className="relative">
    <img
      className="brightness-50 object-cover h-[40vh] w-full"
      src="https://images.pexels.com/photos/3767686/pexels-photo-3767686.jpeg"
      alt="Contact Us Banner"
    />
    <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-7xl font-extrabold text-yellow-600 tracking-wider shadow-lg">
      Contact Us
    </h2>
  </div>


  <div className="max-w-2xl mx-auto p-8 bg-neutral-800 rounded-xl shadow-xl mt-12 border-4 border-yellow-600">
    <p className="text-3xl text-center text-yellow-600 font-semibold mb-6">
      We'd love to hear from you! Fill out the form below to get in touch with us.
    </p>

    <form onSubmit={handleSubmit} className="space-y-6">
    
      <div className="mb-4">
        <label htmlFor="name" className="block text-xl font-semibold text-neutral-300 mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-neutral-900 border-2 border-neutral-600 focus:outline-none focus:ring-2 focus:ring-yellow-600 w-full px-5 py-2 rounded-lg shadow-md text-white text-lg placeholder-gray-400"
        />
      </div>

   
      <div className="mb-4">
        <label htmlFor="email" className="block text-xl font-semibold text-neutral-300 mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-neutral-900 border-2 border-neutral-600 focus:outline-none focus:ring-2 focus:ring-yellow-600 w-full px-5 py-2 rounded-lg shadow-md text-white text-lg placeholder-gray-400"
        />
      </div>


      <div className="mb-4">
        <label htmlFor="phone" className="block text-xl font-semibold text-neutral-300 mb-2">
          Phone:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="bg-neutral-900 border-2 border-neutral-600 focus:outline-none focus:ring-2 focus:ring-yellow-600 w-full px-5 py-2 rounded-lg shadow-md text-white text-lg placeholder-gray-400"
        />
      </div>

    
      <div className="mb-4">
        <label htmlFor="message" className="block text-xl font-semibold text-neutral-300 mb-2">
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          required
          className="bg-neutral-900 border-2 border-neutral-600 focus:outline-none focus:ring-2 focus:ring-yellow-600 w-full px-5 py-2 rounded-lg shadow-md text-white text-lg placeholder-gray-400"
        ></textarea>
      </div>

 
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-yellow-600 text-white font-bold py-2 px-6 rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Submit
        </button>
      </div>

     
      {message && (
        <p className="text-3xl text-center text-green-600 mt-6">
          Thanks! We will get in touch with you soon.
        </p>
      )}
    </form>
  </div>
</div>
  )
}

export default Contact