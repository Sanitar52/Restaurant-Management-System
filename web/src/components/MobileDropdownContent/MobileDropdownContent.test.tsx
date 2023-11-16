import { render } from '@redwoodjs/testing/web'

import MobileDropdownContent from './MobileDropdownContent'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MobileDropdownContent', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MobileDropdownContent />)
    }).not.toThrow()
  })
})
