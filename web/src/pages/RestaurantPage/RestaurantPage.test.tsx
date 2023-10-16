import { render } from '@redwoodjs/testing/web'

import RestaurantPage from './RestaurantPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('RestaurantPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RestaurantPage />)
    }).not.toThrow()
  })
})
