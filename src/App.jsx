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
import React from 'react'; // Required for ErrorBoundary

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
            <p className="text-gray-700">{this.state.error?.message || 'An unexpected error occurred'}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    console.log('Stored login state:', storedLogin); // Debugging
    if (storedLogin === 'true') {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <Navbar />
        {!isLoggedIn ? (
          <main className="flex-grow flex items-center justify-center pt-24">
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          </main>
        ) : (
          <>
            <div className="fixed top-16 left-4 flex space-x-2 z-10">
              <button
                onClick={() => setPage('home')}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Home
              </button>
              <button
                onClick={() => setPage('about')}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                About
              </button>
              <button
                onClick={() => setPage('contact')}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Contact
              </button>
              <button
                onClick={() => setPage('upload')}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Upload
              </button>
            </div>
            <main className="flex-grow pt-24">
              {page === 'home' ? (
                <Home />
              ) : page === 'about' ? (
                <About />
              ) : page === 'contact' ? (
                <Contact />
              ) : page === 'upload' ? (
                <UploadForm />
              ) : (
                <div className="text-center pt-10">Page not found</div>
              )}
            </main>
          </>
        )}
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;