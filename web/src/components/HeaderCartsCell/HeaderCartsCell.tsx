import type { CartMenuItem, Query } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Link, navigate } from '@redwoodjs/router';
import Spinner from '../Spinner/Spinner';
export const QUERY = gql`
  query {
    me {
      cartMenuItem {
        id
        menuItemId
        quantity
        userId
        inCart
        orderPrice
      }
    }
  }
`

export const Loading = () => <Spinner/>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  me,
}: CellSuccessProps<Query>) => {
  console.log("----");
  console.log(me.cartMenuItem);
  const itemCount = me.cartMenuItem.length;
  console.log("----");
  return (<>
    {itemCount !== 0 && (
      <div className="relative group">
        <button
          className="ml-2 bg-blue-600 p-2 rounded-full text-white relative"
          onClick={() => navigate('/cart-menu-item')}
        >
          <svg
            className="w-12 h-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 21"
          >
            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
          </svg>
          {itemCount > 9 ? (
            <div
              className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs font-semibold flex items-center justify-center rounded-full animate-ping"
            >
              {itemCount}
            </div>
          ) : (
            <div
              className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs font-semibold flex items-center justify-center rounded-full transition-transform duration-300 ease-in-out transform group-hover:scale-125"
            >
              {itemCount}
            </div>
          )}
        </button>
      </div>
    )}
  </>)
}
