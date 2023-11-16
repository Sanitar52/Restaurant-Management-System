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

import MobileDropdownContent from './MobileDropdownContent'

const meta: Meta<typeof MobileDropdownContent> = {
  component: MobileDropdownContent,
}

export default meta

type Story = StoryObj<typeof MobileDropdownContent>

export const Primary: Story = {}
