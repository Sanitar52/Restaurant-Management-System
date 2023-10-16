import type { Meta, StoryObj } from '@storybook/react'

import ManagementPage from './ManagementPage'

const meta: Meta<typeof ManagementPage> = {
  component: ManagementPage,
}

export default meta

type Story = StoryObj<typeof ManagementPage>

export const Primary: Story = {}
