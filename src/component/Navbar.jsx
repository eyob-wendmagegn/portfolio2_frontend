import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-10 items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-gray-800">Eyob Portfolio</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200">Login</button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-indigo-600 p-2 rounded-md transition-colors duration-200">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200">Login</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;