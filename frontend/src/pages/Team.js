import { useEffect, useState } from 'react';
import axios from 'axios';
import scrollToTop from '../helpers/scrollToTop';
import BarbersList from '../components/ComponentsAPI/Barbers'

const API_URL = 'http://127.0.0.1:8000/api/barbers';
const STORAGE = 'http://127.0.0.1:8000/storage/';
const PLACEHOLDER = '/default-barber.jpg'; 

function Team() {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    scrollToTop();
    (async () => {
      try {
       
        const { data } = await axios.get(API_URL); 
        setBarbers(data);
      } catch (err) {
        setError('Unable to fetch barbers.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const imgSrc = (b) =>
    b.profile_picture?.startsWith('http')
      ? b.profile_picture
      : b.profile_picture
      ? STORAGE + b.profile_picture
      : PLACEHOLDER;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
    
      <div className="relative">
        <img
          className="brightness-50 object-cover h-[40vh] w-full"
          src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg"
          alt="Team banner"
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-center text-5xl md:text-6xl text-yellow-500 font-extrabold tracking-wide">
          Meet Our Artists
        </h2>
      </div>

      
      <BarbersList/>
    </div>
  );
}

export default Team;