import { render } from '@redwoodjs/testing/web'

import CartMenuItemPage from './CartMenuItemPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CartMenuItemPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CartMenuItemPage />)
    }).not.toThrow()
  })
})
