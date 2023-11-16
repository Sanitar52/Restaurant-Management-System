
// MobileDropdownContent.tsx
import React from 'react';
import { Link } from '@redwoodjs/router';
import { useAuth } from 'src/auth';


type MobileDropdownContentProps = {
  isAuthenticated: boolean;
  currentUserRole: string | null | undefined;
};



const MobileDropdownContent = () => {
  const {currentUser, isAuthenticated} = useAuth()
  const currentUserRole = currentUser?.role
  return ( <>
    {!isAuthenticated ? (
      <>
        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
          <Link to="/restaurant">Restaurants</Link>
        </li>
      </>
    ) : currentUserRole === 'EMPLOYEE' ? (
      <>
        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
          <Link to="/restaurant">Take Order</Link>
        </li>
        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
          <Link to="/management">Orders</Link>
        </li>
      </>
    ) : currentUserRole === 'ADMIN' ? (
      <>
        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
          <Link to="/restaurant">Restaurants</Link>
        </li>
        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
          <Link to="/management">Management</Link>
        </li>
      </>
    ) : (
      <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
        <Link to="/restaurant">Restaurants</Link>
      </li>
    )}
    {!isAuthenticated ? (
      <>
        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
          <Link to="/signup">Sign Up</Link>
        </li>
        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
          <Link to="/login">Login</Link>
        </li>
      </>
    ) : null}
  </>)
}

export default MobileDropdownContent
