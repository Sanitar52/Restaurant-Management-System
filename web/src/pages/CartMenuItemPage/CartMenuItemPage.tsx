import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth';
import CartMenuItemCell from 'src/components/CartMenuItemCell';

const CartMenuItemPage = () => {
    const { isAuthenticated, currentUser } = useAuth();



  return (
    <>
      <MetaTags title="CartMenuItem" description="CartMenuItem page" />

      <h1>CartMenuItemPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/CartMenuItemPage/CartMenuItemPage.tsx</code>
      </p>
      <p>
        My default route is named <code>cartMenuItem</code>, link to me with `
        <Link to={routes.cartMenuItem()}>CartMenuItem</Link>`
      </p>

      <CartMenuItemCell />

    </>
  )
}

export default CartMenuItemPage
