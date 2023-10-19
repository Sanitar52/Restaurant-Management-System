import { Link } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'src/auth';
import { User } from 'types/graphql';

type HeaderLayoutProps = {
  children?: React.ReactNode;
};

const GET_USER_INFO = gql`
  query GetUserInfo($userId: Int!) {
    user(id: $userId) {
      name
      username
      email
    }
  }
`;

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  const auth = useAuth();
  const { isAuthenticated, currentUser, logOut } = useAuth();
  const [currentUserData, setCurrentUserData] = useState<any>(null);
  const { loading, error, data: userData } = useQuery(GET_USER_INFO, {
    variables: { userId: auth.currentUser ? auth.currentUser.id : 1 },
  });

  useEffect(() => {
    if (!loading && !error) {
      setCurrentUserData(userData);
    }
  }, [loading, error, userData]);
  console.log(currentUserData)



  const handleLogout = async () => {
    // You can implement your logout logic here, e.g., calling an API endpoint
    // to invalidate the user's session and clear the authentication token.
    // After that, you can redirect the user to the login page or perform any
    // other necessary actions.

    try {
      // Call your logout API or clear the authentication token
      // Example: await api.logout();

      // After successful logout, you can redirect the user to the login page
      // Example: router.push('/login');

      // Alternatively, you can call the `logout` method from your authentication library
      await auth.logOut();
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
            <div className="text-white font-bold text-2xl">
              Restaurant Management System
            </div>
            <ul className="flex space-x-4">
              {/* Display the current user's name if authenticated */}
              {auth.isAuthenticated ? (
                <li className="text-white">{
                  currentUserData?.user?.username
                }</li>
              ) : null}
              <li className="text-white">
                <Link to="/restaurant">Restaurants</Link>
              </li>
              <li className="text-white">
                <Link to="/management">Management</Link>
              </li>
              {!auth.isAuthenticated ? (
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
              {auth.isAuthenticated ? (
                <li>
                  <button
                    className="text-white"
                    onClick={handleLogout}
                  >
                    Logout
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
