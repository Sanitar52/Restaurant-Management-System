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

const CREATE_MENU_ITEM = gql`
  mutation CreateMenuItemInput($input: CreateMenuItemInput!) {
    createMenuItem(input: $input) {
      id
    }
  }
`;
const USER_RESTAURANT = gql`
  query GetCurrentRestaurantName($userId: Int!) {
  user(id: $userId) {
    employee {
      restaurant {
        name
        restaurantCode
      }
    }
  }
}
`;

const ManagementPage: React.FC=  () => {
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const [currentUserRestaurantData, setCurrentUserRestaurantData] = useState<any>(
    null
  );

  const { loading, error, data: restaurantData } = useQuery(USER_RESTAURANT, {
    variables: { userId: auth.currentUser ? auth.currentUser.id : null },
  });

  useEffect(() => {
    if (!loading && !error) {
      setCurrentUserRestaurantData(restaurantData);
    }
  }, [loading, error, restaurantData]);
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
    await create({
      variables: {
        input: {
          ...data,
          quantity: parseInt(quantity.toString(), 10),
          price: parseFloat(price.toString()),
          restaurantCode: restaurantData.user?.employee?.restaurant?.restaurantCode || 0, // Use the restaurant code from the user's restaurant
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
      <button
        onClick={() => openPopup('Menu')}
        className="button-primary-lg mb-4"
      >
        Menu
      </button>
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
              <TextField
                name="restaurantCode"
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                defaultValue={restaurantData.user?.employee?.restaurant?.name}
                readOnly
              />

              <div className="rw-button-group">
                <Submit
                  className={`rw-button rw-button-blue ${
                    isLoading ? 'rw-loading' : ''
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
      default:
        return null;
    }
  }
};

export default ManagementPage;
