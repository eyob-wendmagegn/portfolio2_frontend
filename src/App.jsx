import './App.css';
import Navbar from './component/Navbar';
import { useState, useEffect } from 'react';
import Home from './component/Home';
import About from './component/About';
import Contact from './component/Contact';
import UploadForm from './component/UploadForm';
import LoginForm from './component/LoginForm';
import Header from './component/Header';
import Footer from './component/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');

  useEffect(() => {
    localStorage.removeItem('isLoggedIn');
    const storedLogin = localStorage.getItem('isLoggedIn');
    if (storedLogin === 'true') {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24"> {/* Added pt-24 to match header height */}
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Navbar />
      <div className="fixed top-16 left-4 flex space-x-2 z-10">
        <button onClick={() => setPage('home')} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">Home</button>
        <button onClick={() => setPage('about')} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">About</button>
        <button onClick={() => setPage('contact')} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">Contact</button>
        <button onClick={() => setPage('upload')} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">Upload</button>
      </div>
      <main className="flex-grow pt-24"> {/* Added pt-24 to match header height */}
        {page === 'home' ? <Home /> : page === 'about' ? <About /> : page === 'contact' ? <Contact /> : page === 'upload' ? <UploadForm /> : null}
      </main>
      <Footer />
    </div>
  );
}

export default App;