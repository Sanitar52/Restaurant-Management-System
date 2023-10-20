import { Link, routes } from '@redwoodjs/router';
import { Toaster } from '@redwoodjs/web/dist/toast';
import React from 'react';

interface Props {
  restaurant: {
    id: number;
    name: string;
    body: string;
    logo: string;
  };
}

const Restaurant = ({ restaurant }: Props) => {
  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 2000 }} />
      <Link to={routes.restaurant({ name: restaurant.name })} className="max-w-sm overflow-hidden rounded shadow-lg">
        <div className="max-w-sm overflow-hidden rounded shadow-lg hover:bg-gray-200 transition-colors duration-300 ease-in-out">
          <img
            className="h-[300px] w-[500px] hover:bg-gray-200 transition-colors duration-300 ease-in-out"
            src={restaurant.logo}
            alt="Card Image"
          />
          <div className="px-6 py-4">
            <div className="mb-2 text-xl font-bold">{restaurant.name}</div>
            <p className="text-base text-gray-700">{restaurant.body}</p>
          </div>  
        </div>
      </Link>
    </>
  )
};

export default Restaurant;
