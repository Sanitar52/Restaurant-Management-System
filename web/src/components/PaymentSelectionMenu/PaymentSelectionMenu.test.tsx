import { render } from '@redwoodjs/testing/web'

import PaymentSelectionMenu from './PaymentSelectionMenu'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PaymentSelectionMenu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PaymentSelectionMenu />)
    }).not.toThrow()
  })
})
