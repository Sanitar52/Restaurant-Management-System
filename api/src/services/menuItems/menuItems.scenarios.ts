import type { Prisma, MenuItem } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MenuItemCreateArgs>({
  menuItem: {
    one: {
      data: {
        name: 'String',
        logo: 'String',
        description: 'String',
        quantity: 6925177,
        restaurant: {
          create: {
            name: 'String',
            body: 'String',
            logo: 'String',
            restaurantCode: 2202088,
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        logo: 'String',
        description: 'String',
        quantity: 1511492,
        restaurant: {
          create: {
            name: 'String',
            body: 'String',
            logo: 'String',
            restaurantCode: 5638097,
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<MenuItem, 'menuItem'>
