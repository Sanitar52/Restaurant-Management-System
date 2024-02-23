import { Link, navigate } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';
import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from 'src/auth';
import { User } from 'types/graphql';
import HeaderCartsCell from "../../components/HeaderCartsCell"
import MobileDropdownContent from '../../components/MobileDropdownContent';
type HeaderLayoutProps = {
  children?: React.ReactNode;
};

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth();
  const [currentUserData, setCurrentUserData] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [cartMenuItemLength, setCartMenuItemLength] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width based on your mobile breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  }

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error as needed
    }
  };

  return (
    <>
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between">
          {
  isMobile ? (
    <div className="flex items-center justify-end w-full">
      <ul className="flex space-x-4">
        {/* Display the Logout button if authenticated */}
        {isAuthenticated ? (
          <>


            <li className="relative">
                  <button
                    className="text-white cursor-pointer mr-32"
                    onClick={toggleDropdown}
                  >Hello, {"               "         }
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
                          <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Crypto Wallet</a>
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
                <li className="text-white">
              <HeaderCartsCell />
            </li>
            <li>
              <button
                className="text-white cursor-pointer mr-8 text-2xl"
                onClick={toggleMobileDropdown}
              >
                ☰
              </button>
              {isMobileDropdownOpen && (
                <div
                  id="dropdownInformation"
                  className=" z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 right-0 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <MobileDropdownContent />
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleLogout}>Sign out</a>
                  </div>
                </div>
              )}
            </li>
          </>
        ) : null}
      </ul>
    </div>
  ) : (
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
              {!isAuthenticated ? <>
                <li className="text-white">
                  <Link to="/restaurant">Restaurants</Link>
                </li>

              </>:
              currentUser?.role=== 'EMPLOYEE' ? (
                <><li className="text-white">
                  <Link to="/restaurant">Take Order</Link>
                </li><li className="text-white">
                    <Link to="/management">Orders</Link>
                  </li></>
              ) : currentUser?.role==='ADMIN'  ? <><li className="text-white">
                  <Link to="/restaurant">Restaurants</Link>
                </li><li className="text-white">
                    <Link to="/management">Management</Link>
                  </li></>:<li className="text-white">
                  <Link to="/restaurant">Restaurants</Link>
                </li>}

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
              {isAuthenticated ? (<>
                <li>
                  <button
                    className="text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
                <li className="text-white">
                <HeaderCartsCell />
              </li>
              </>
              ) : null}
    </ul>
  )
}
            <ul className="flex space-x-4">

            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default HeaderLayout;
function useMediaQuery(arg0: { maxWidth: number; }) {
  throw new Error('Function not implemented.');
}

