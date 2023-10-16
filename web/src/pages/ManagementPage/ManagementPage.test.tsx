import { render } from '@redwoodjs/testing/web'

import ManagementPage from './ManagementPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ManagementPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ManagementPage />)
    }).not.toThrow()
  })
})
