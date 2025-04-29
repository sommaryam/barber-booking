import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import scrollToTop from '../helpers/scrollToTop';
import bgnotF from '../images/bgnotF.jpg';
function NotFound() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="relative min-h-screen">
     
      <img 
        src={bgnotF}
        className="w-full h-full object-cover opacity-40" 
      />
      
     
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
     
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Oops! This Page Does Not Exist.
        </h1>
        <Link 
          to="/" 
          className="mt-8 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition-colors duration-300"
          aria-label="Return To Home"
        >
          Return To Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;