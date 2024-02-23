// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import PaymentSelectionMenu from './PaymentSelectionMenu'

const meta: Meta<typeof PaymentSelectionMenu> = {
  component: PaymentSelectionMenu,
}

export default meta

type Story = StoryObj<typeof PaymentSelectionMenu>

export const Primary: Story = {}
