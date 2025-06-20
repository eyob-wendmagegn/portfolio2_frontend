import { useEffect, useState } from 'react';
import image1 from '../assets/image1.jpg'; // Import the image

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to Eyob's Portfolio</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Explore my journey and projects as a 4th-year Computer Science student at Wolaita University.</p>
        <img
          src={image1} // Use the imported image
          alt="Home Background"
          loading="lazy"
          className="mt-8 w-full max-w-2xl mx-auto rounded-xl shadow-lg object-cover max-h-96"
        />
      </div>
    </div>
  );
};

export default Home;