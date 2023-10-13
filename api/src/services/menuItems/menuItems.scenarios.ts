import type { Prisma, MenuItem } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MenuItemCreateArgs>({
  menuItem: {
    one: { data: { name: 'String' } },
    two: { data: { name: 'String' } },
  },
})

export type StandardScenario = ScenarioData<MenuItem, 'menuItem'>
