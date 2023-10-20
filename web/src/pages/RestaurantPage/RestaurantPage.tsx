import { Link, navigate, routes, useParams } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'
import RestaurantsCell, { QUERY } from '../../components/RestaurantsCell'
import { useAuth } from 'src/auth'
import { useEffect, useState } from 'react';
import MenuItem from 'src/components/MenuItem/MenuItem';
import RestaurantByNameCell from '../../components/RestaurantByNameCell';
import CartMenuItemCell from '../../components/CartMenuItemCell';
import { getCurrentUser } from 'src/lib/auth';

const RestaurantPage = ({ name }) => {
  const { isAuthenticated, currentUser } = useAuth();
  console.log(name)




  return (
    <>
      <MetaTags
        title="Restaurant"
      // description="Restaurant page"
      />
      {isAuthenticated ? (
        <>
        {currentUser?.role === 'ADMIN' ? (
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
          <div>You are not authorized to see this page</div>
        )}


    </>
  );
};

export default RestaurantPage;