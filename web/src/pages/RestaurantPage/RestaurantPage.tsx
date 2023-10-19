import { Link, routes, useParams } from '@redwoodjs/router'
import { MetaTags, useQuery } from '@redwoodjs/web'
import RestaurantCell, { QUERY } from '../../components/RestaurantsCell'
import { useAuth } from 'src/auth'
import { useEffect, useState } from 'react';
const USER_DATA = gql`
  query GetCurrentUserInformation($userId: Int!) {
    user(id: $userId) {
    role
    employee {
      restaurant {
        logo
        menuItems {
          category
          description
          id
          logo
          name
          price
          quantity
        }
      }
      restaurantCode
    }
  }
}
`;
const RESTAURANT_DATA = gql`
  query GetRestaurantInformation($restaurantId: Int!) {
    restaurant(id: $restaurantId) {
      id
      name
      logo
      menuItems {
        category
        description
        id
        logo
        name
        price
        quantity
      }
    }
  }
`;
const RestaurantPage = () => {
  const auth = useAuth();
  const [currentUserData, setCurrentUserData] = useState<any>(null);
  



  const { loading, error, data: currentUser } = useQuery(USER_DATA, {
    variables: { userId: auth.currentUser ? auth.currentUser.id : null },
  });
  console.log(currentUser);

  const userRole = currentUser?.user?.role;

    useEffect(() => {
      if (!loading && !error) {
        setCurrentUserData(currentUser);
      }
    }, [loading, error, currentUser]);

    
    
  return (
    <>
      {userRole === 'ADMIN' ? (
        <RestaurantCell />
      ) : userRole === 'EMPLOYEE' ? (
        <div>
          Hello {currentUser?.username} This is your restaurant:{' '}
          {currentUser?.restaurant?.restaurantName}
        </div>
      ) : (
        <div>You are not authorized to see this page</div>
      )}
    </>
  );
};

export default RestaurantPage;