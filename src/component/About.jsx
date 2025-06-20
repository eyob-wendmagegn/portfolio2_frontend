import { useEffect, useState } from 'react';
import image3 from '../assets/image3.jpg'; // Verify this path matches the file location

const About = () => {
  const [aboutContent, setAboutContent] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/about`)
      .then(res => res.json())
      .then(data => setAboutContent(data.content));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/2">
            <p className="text-lg text-gray-700 leading-relaxed">
              {aboutContent || 'I am Eyob Wendmagegn, a 4th-year Computer Science student at Wolaita University. I am passionate about web development and have been honing my skills in React.js, Node.js, and MongoDB to build dynamic and user-friendly applications. My academic journey has equipped me with a solid foundation in programming, and I am eager to apply my knowledge to real-world projects. Outside of studies, I enjoy exploring new technologies and contributing to open-source initiatives.'}
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
            <img
              src={image3} // Use the imported image
              alt="About Me"
              loading="lazy"
              className="w-full max-w-md h-auto rounded-xl shadow-lg object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;