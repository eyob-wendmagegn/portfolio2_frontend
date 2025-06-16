const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg">© {new Date().getFullYear()} Eyob Wende. All rights reserved.</p>
        <p className="mt-2 text-lg">Email: <a href="mailto:eyobwende18@gmail.com" className="text-indigo-300 hover:text-indigo-100 underline transition-colors duration-200">eyobwende18@gmail.com</a></p>
      </div>
    </footer>
  );
};

export default Footer;