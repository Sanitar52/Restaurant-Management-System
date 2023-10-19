import type {
  FindMenuItemQuery,
  FindMenuItemQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindMenuItemQuery($id : Int!) {
  restaurant(id: $id) {
    menuItems {
      restaurantCode
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

export const Failure = ({
  error,
}: CellFailureProps<FindMenuItemQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  menuItem,
}: CellSuccessProps<FindMenuItemQuery, FindMenuItemQueryVariables>) => {
  return <div>{JSON.stringify(menuItem)}</div>
}
