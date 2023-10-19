import { render } from '@redwoodjs/testing/web'

import MenuItem from './MenuItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MenuItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MenuItem />)
    }).not.toThrow()
  })
})
