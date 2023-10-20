import type { RestaurantsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Restaurant from '../Restaurant'
import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query RestaurantsQuery {
    restaurants {
    id
    body
    logo
    name
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
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  restaurants,
}: CellSuccessProps<RestaurantsQuery>) => {
  
  return (
    <div className="flex flex-wrap justify-center">
      {restaurants.map((restaurant) => {
        return (
          <div className="mr-12 hover:bg-gray-200 transition-colors duration-300 ease-in-out" key={restaurant.id}>
          <Link to={routes.restaurant({ name:restaurant.name })}>
            <Restaurant restaurant={restaurant} />
          </Link>
        </div>
        )
      })}
    </div>
  )
}
