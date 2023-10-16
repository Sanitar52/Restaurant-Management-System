import { render } from '@redwoodjs/testing/web'

import Restaurant from './Restaurant'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Restaurant', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Restaurant restaurant={{
        name: '',
        body: '',
        logo: '',
      }} />)
    }).not.toThrow()
  })
})
