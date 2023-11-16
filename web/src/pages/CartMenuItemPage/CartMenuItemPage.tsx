import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth';
import CartMenuItemCell from '../../components/CartMenuItemCell';

const CartMenuItemPage = () => {
    const { isAuthenticated, currentUser } = useAuth();



  return (
    <>
      <MetaTags title="CartMenuItem" description="CartMenuItem page" />


      <CartMenuItemCell />

    </>
  )
}

export default CartMenuItemPage
