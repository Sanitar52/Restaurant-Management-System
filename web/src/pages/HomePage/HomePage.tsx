import { useEffect, useRef } from 'react';
import { Link, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import takeorderImage from '../../../public/takeorder.png'; // Import the image

const HomePage = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollTop = window.scrollY;
        const backgroundOffset = scrollTop * 0.5; // Adjust the value to control the scrolling speed
        backgroundRef.current.style.backgroundPositionY = `-${backgroundOffset}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div
        ref={backgroundRef}
        className="min-h-screen bg-fixed bg-cover bg-center transition-all duration-300 relative"
        style={{ backgroundImage: `url(${takeorderImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-80">
          <div className="max-w-2xl px-8 py-12 bg-white shadow-lg rounded-lg">
            {/* Your content goes here */}
            <h1 className="text-3xl font-bold text-center mb-8">Welcome to Our Restaurant Management System.</h1>
            <p className="text-lg text-gray-700 mb-6">
              We're glad you're here. Explore our offerings and find out more about what we have to offer.
            </p>
            <div className="flex justify-center space-x-20">
              <Link to={routes.restaurantPage()} className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600">
                Order Food
              </Link>
              <Link to={routes.management()} className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600">
                Manage Your Restaurant
              </Link>
            </div>
          </div>
        </div>

        <div className="fixed bottom-4 right-4">
          <Link to={routes.restaurantPage()} className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600">
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
