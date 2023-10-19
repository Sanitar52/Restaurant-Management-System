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

import MenuItem from './MenuItem'

const meta: Meta<typeof MenuItem> = {
  component: MenuItem,
}

export default meta

type Story = StoryObj<typeof MenuItem>

export const Primary: Story = {}
