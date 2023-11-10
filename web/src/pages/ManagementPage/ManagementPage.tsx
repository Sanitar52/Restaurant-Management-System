import React, { useEffect, useState } from 'react';
import { useAuth } from 'src/auth';
import {
  Form,
  Label,
  TextField,
  FieldError,
  Submit,
  SubmitHandler,
  SelectField,
} from '@redwoodjs/forms';
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';
import { useRef } from 'react';
import {
  CreateMenuItemInput,
  CreateMenuItemInputVariables,
  User,
} from 'types/graphql';
import OrdersCell from '../../components/OrdersCell';
const CREATE_MENU_ITEM = gql`
  mutation CreateMenuItemInput($input: CreateMenuItemInput!) {
    createMenuItem(input: $input) {
      id
    }
  }
`;
const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants {
      name
      restaurantCode
    }
  }
`;

const CREATE_RESTAURANT = gql`
  mutation CreateRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      id
    }
  }
`;

const ManagementPage: React.FC = () => {

  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const { currentUser, isAuthenticated } = useAuth()
  const [allRestaurantsData, setAllRestaurantsData] = useState<any>(null);
  const userRole = currentUser?.role;
  const { loading: loadingRestaurantData, error: restaurantErrorData, data: restaurantsData } = useQuery(GET_RESTAURANTS);
  useEffect(() => {
    if (!loadingRestaurantData && !restaurantErrorData) {
      setAllRestaurantsData(restaurantsData);
    }

  }, [loadingRestaurantData, restaurantErrorData, restaurantsData])



  const openPopup = (formType: string) => {
    setShowPopup(formType);
  };

  const closePopup = () => {
    setShowPopup(null);
  };

  const [create] = useMutation<
    CreateMenuItemInput,
    CreateMenuItemInputVariables
  >(CREATE_MENU_ITEM);

  const onSubmit: SubmitHandler<CreateMenuItemInput> = async (data) => {

    setIsLoading(true)
    const quantity: number = data.quantity;
    const price: number = data.price;
    const restaurantCodeAdmin: number = data.restaurantCode;
    const restaurantCodeEmployee: number = currentUser?.employee?.restaurant?.restaurantCode;
    await create({
      variables: {
        input: {
          ...data,
          quantity: parseInt(quantity.toString(), 10),
          price: parseFloat(price.toString()),
          restaurantCode: userRole === 'EMPLOYEE' ? parseInt(restaurantCodeEmployee.toString()) : userRole === 'ADMIN' ? parseInt(restaurantCodeAdmin.toString()) : 0, // Use the restaurant code from the user's restaurant
        },
      },
    })
      .then(() => {
        toast.success('Menu item created successfully');
        closePopup();
      })
      .catch((error) => {
        toast.error('Error creating menu item');
        console.error(error);
      });
    setIsLoading(false);
  };

  return (
    <>
      <MetaTags title="Management" description="Management page" />
      <div className="flex flex-col items-center justify-center h-screen  ">
        <button
          onClick={() => openPopup('Menu')}
          className=" h-auto max-w-lg button-primary-lg mb-12 w-full justify-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
          </svg>
          Menu Ekle
        </button>
        <button
          onClick={() => openPopup('Orders')}
          className="h-auto max-w-lg button-primary-lg mb-12 w-full justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
          </svg>
          Siparişlere bak
        </button>
        <button
          onClick={() => openPopup('Orders')}
          className="h-auto max-w-lg button-primary-lg mb-12 w-full justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
          </svg>
          Test1
        </button>
        <button
          onClick={() => openPopup('Orders')}
          className="h-auto max-w-lg button-primary-lg mb-12 w-full justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
          </svg>
          Test2
        </button>
        <button
          onClick={() => openPopup('Orders')}
          className="h-auto max-w-lg button-primary-lg mb-12 w-full justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
          </svg>
          Test3
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-md">{renderPopup()}</div>
        </div>
      )}
    </>
  );

  function renderPopup() {
    switch (showPopup) {
      case 'Menu':
        return (
          <div className="popup">
            <Form onSubmit={onSubmit} className="rw-form-wrapper">
              <Label
                name="name"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Name
              </Label>
              <TextField
                name="name"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                validation={{
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                }}
              />
              <FieldError name="name" className="rw-field-error" />

              <Label
                name="description"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Description
              </Label>
              <TextField
                name="description"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                validation={{
                  required: {
                    value: true,
                    message: 'Description is required',
                  },
                }}
              />
              <FieldError name="description" className="rw-field-error" />
              <Label
                name="logo"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                logo
              </Label>
              <TextField
                name="logo"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                validation={{
                  required: {
                    value: true,
                    message: 'Logo is required',
                  },
                }}
              />

              <FieldError name="logo" className="rw-field-error" />

              <Label
                name="quantity"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Quantity
              </Label>
              <TextField
                name="quantity"
                className="rw-input"
                errorClassName="rw-input rw-input-error"

                validation={{
                  required: {
                    value: true,
                    message: 'Quantity is required',
                  },
                }}
              />
              <FieldError name="quantity" className="rw-field-error" />

              <Label
                name="price"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Price
              </Label>
              <TextField
                name="price"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                validation={{
                  required: {
                    value: true,
                    message: 'Price is required',
                  },
                }}
              />
              <FieldError name="price" className="rw-field-error" />

              <Label
                name="category"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Category
              </Label>
              <SelectField
                name="category"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                validation={{
                  required: {
                    value: true,
                    message: 'Category is required',
                  },
                }}
              >
                <option value="APPETIZER">Appetizer</option>
                <option value="PIZZA">Pizza</option>
                <option value="BURGER">Burger</option>
                <option value="MAIN_COURSE">Main Course</option>
                <option value="VEGETARIAN">Vegetarian</option>
                <option value="DESSERT">Dessert</option>
                <option value="HOTDRINK">Hot Drink</option>
                <option value="COLDDRINK">Cold Drink</option>
              </SelectField>
              <FieldError name="category" className="rw-field-error" />

              <Label
                name="restaurantCode"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Restaurant
              </Label>
              {userRole === 'ADMIN' && (
                <SelectField
                  name="restaurantCode"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  validation={{
                    required: {
                      value: true,
                      message: 'Restaurant is required',
                    },
                  }}
                >
                  <option value="0">Select a restaurant</option>
                  {allRestaurantsData?.restaurants.map(
                    (restaurant: any) => (
                      <option value={restaurant.restaurantCode}>
                        {restaurant.name}
                      </option>
                    )
                  )}
                </SelectField>
              )
              }
              {userRole === 'EMPLOYEE' &&
                <TextField
                  name="restaurantCode"
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  defaultValue={currentUser?.employee?.restaurant?.name}
                  readOnly
                />
              }

              <div className="rw-button-group">
                <Submit
                  className={`rw-button rw-button-blue ${isLoading ? 'rw-loading' : ''
                    }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting ...' : 'Submit'}
                </Submit>
              </div>
            </Form>
            <button onClick={closePopup} className="button-secondary mt-4">
              Close
            </button>
          </div>
        );
      case 'Orders':
        return (
        <div className="popup">
          <OrdersCell />
          <h1>Orders</h1>
          <button onClick={closePopup} className="button-secondary mt-4">
            Close
          </button>
        </div>
        );
      default:
        return null;
    }
  }
};

export default ManagementPage;
