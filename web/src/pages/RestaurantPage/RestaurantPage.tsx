import { Link, navigate, routes, useParams } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'
import RestaurantsCell, { QUERY } from '../../components/RestaurantsCell'
import { useAuth } from 'src/auth'
import { useEffect, useRef, useState } from 'react';
import MenuItem from 'src/components/MenuItem/MenuItem';
import RestaurantByNameCell from '../../components/RestaurantByNameCell';
import { getCurrentUser } from 'src/lib/auth';
import restorantbg from '../../../public/restoranbg.webp';    // Import the image
const RestaurantPage = ({ name }) => {
  const { isAuthenticated, currentUser } = useAuth();
  console.log(name)
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
      <MetaTags
        title="Restaurant"
      // description="Restaurant page"
      />
      <div
        ref={backgroundRef}
        className="min-h-screen bg-fixed bg-cover bg-center transition-all duration-300 relative opacity-85 "
        style={{ backgroundImage: `url(${restorantbg})` }}
      >
      {isAuthenticated ? (
        <>
        {currentUser?.role === 'ADMIN' || currentUser?.role === 'CUSTOMER' ? (
          name ? <RestaurantByNameCell name={name.replace('%20', ' ')} /> : <RestaurantsCell />

        ) : currentUser?.role === 'EMPLOYEE' ? (
          <div>
            Hello {currentUser?.username} This is your restaurant:{' '}
            {currentUser?.employee?.restaurant?.name}

            {currentUser?.employee?.restaurant?.menuItems.map(
              (menuItem) => (
                <MenuItem key={menuItem.id} menuItem={menuItem} />
              )
            )}
          </div>
        ) : (
          <div>You are not authorized to see this page</div>
        )}
        </>
      )
        : (
          <div>Please sign up to order
            <div className="m-4">
            <button className="rw-button rw-button-blue" onClick={() => navigate(routes.signup())}>Sign Up</button>
            </div>
          </div>
        )}
      </div>

    </>
  );
};

export default RestaurantPage;