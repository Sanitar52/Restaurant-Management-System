
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import MenuItem from '../MenuItem/MenuItem'

export const QUERY = gql`
  query FindMenuItemsByRestaurantName($name: String!) {
    restaurantByName(name: $name) {
      menuItems {
        category
        description
        id
        logo
        name
        price
        quantity
        restaurantCode
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  restaurantByName,
}: CellSuccessProps) => {
  console.log(restaurantByName)
  return (
    <div className="flex flex-wrap justify-center">
      {restaurantByName.map((restaurant) => (
        restaurant?.menuItems.map((menuItem) => (
          <div className="mr-12 hover:bg-gray-200 transition-colors duration-300 ease-in-out" key={menuItem.id}>
        <MenuItem menuItem={menuItem} />
      </div>
          
        ))
      ))}
    </div>
  )

}
