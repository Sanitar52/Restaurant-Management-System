import type { Meta, StoryObj } from '@storybook/react'

import CartMenuItemPage from './CartMenuItemPage'

const meta: Meta<typeof CartMenuItemPage> = {
  component: CartMenuItemPage,
}

export default meta

type Story = StoryObj<typeof CartMenuItemPage>

export const Primary: Story = {}
