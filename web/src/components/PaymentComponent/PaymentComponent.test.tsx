import { render } from '@redwoodjs/testing/web'

import PaymentComponent from './PaymentComponent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PaymentComponent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PaymentComponent />)
    }).not.toThrow()
  })
})
