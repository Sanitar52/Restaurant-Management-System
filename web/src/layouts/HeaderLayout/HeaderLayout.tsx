import { Link, navigate } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'src/auth';
import { User } from 'types/graphql';

type HeaderLayoutProps = {
  children?: React.ReactNode;
};

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  const { isAuthenticated, currentUser, logOut, userMetadata } = useAuth();
  const [currentUserData, setCurrentUserData] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to track dropdown visibility
  const [cartMenuItemLength, setCartMenuItemLength] = useState<number>(0); // State to track cartMenuItem length



  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error as needed
    }
  };
  useEffect(() => {
    // Update cartMenuItemLength when currentUser's cartMenuItem changes
    setCartMenuItemLength(currentUser?.cartMenuItem.length || 0);
  }, [currentUser?.cartMenuItem]);

  return (
    <>
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between">
            <div className="text-white font-bold text-2xl">
              Restaurant Management System
            </div>
            <ul className="flex space-x-4">
              {/* Display the current user's name if authenticated */}
              {isAuthenticated ? (
                <li className="relative">
                  <button
                    className="text-white cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    {currentUser?.username}
                  </button>
                  {isDropdownOpen && (
                    <div
                      id="dropdownInformation"
                      className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{currentUser?.username}</div>
                        <div className="font-medium truncate">
                          {currentUser?.email}
                        </div>
                      </div>
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                        <li>
                          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                        </li>
                        <li>
                          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                        </li>
                        <li>
                          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Management</a>
                        </li>
                        <li>
                          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Restaurant</a>
                        </li>
                      </ul>
                      <div className="py-2">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleLogout}>Sign out</a>
                      </div>
                    </div>
                  )}
                </li>
              ) : null}
              {currentUser?.role=== 'EMPLOYEE' ? (
                <><li className="text-white">
                  <Link to="/restaurant">Take Order</Link>
                </li><li className="text-white">
                    <Link to="/management">Orders</Link>
                  </li></>
              ) : <><li className="text-white">
                  <Link to="/restaurant">Restaurants</Link>
                </li><li className="text-white">
                    <Link to="/management">Management</Link>
                  </li></>}

              {!isAuthenticated ? (
                <>
                  <li className="text-white">
                    <Link to="/signup">Sign Up</Link>
                  </li>
                  <li className="text-white">
                    <Link to="/login">Login</Link>
                  </li>
                </>
              ) : null}

              {/* Display the Logout button if authenticated */}
              {isAuthenticated ? (
                <li>
                  <button
                    className="text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : null}
              {cartMenuItemLength > 0 && isAuthenticated ? (
                <li>
                  <button className="ml-2 rounded-full bg-blue-600 p-2 text-white"
                    onClick={() => navigate('/cart-menu-item')}>
                    <svg className="w-12 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                      <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                    </svg>
                  </button>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default HeaderLayout;
