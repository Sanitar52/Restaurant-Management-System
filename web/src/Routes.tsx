// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import HeaderLayout from 'src/layouts/HeaderLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>







      <Set wrap={HeaderLayout}>

        <Route path="/restaurant" page={RestaurantPage} name="restaurantPage" prerender />
        {/* <Private unauthenticated="home" roles={["EMPLOYEE","ADMIN"]}> */}
          <Route path="/management" page={ManagementPage} name="management" />
        {/* </Private> */}
          <Route path="/cart-menu-item" page={CartMenuItemPage} name="cartMenuItem" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/restaurant/{name:String}" page={RestaurantPage} name="restaurant" />
      </Set>
        <Route notfound page={NotFoundPage} />

    </Router>
  )
}

export default Routes
