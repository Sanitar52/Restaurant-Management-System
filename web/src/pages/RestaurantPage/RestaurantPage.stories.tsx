import type { Meta, StoryObj } from '@storybook/react'

import RestaurantPage from './RestaurantPage'

const meta: Meta<typeof RestaurantPage> = {
  component: RestaurantPage,
}

export default meta

type Story = StoryObj<typeof RestaurantPage>

export const Primary: Story = {}
