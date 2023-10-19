import type { Prisma, MenuItem } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MenuItemCreateArgs>({
  menuItem: {
    one: {
      data: {
        name: 'String',
        logo: 'String',
        description: 'String',
        quantity: 4490778,
        price: 1313649.633742018,
        restaurant: {
          create: {
            name: 'String',
            body: 'String',
            logo: 'String',
            restaurantCode: 8178997,
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        logo: 'String',
        description: 'String',
        quantity: 3093483,
        price: 3555025.240140037,
        restaurant: {
          create: {
            name: 'String',
            body: 'String',
            logo: 'String',
            restaurantCode: 1812499,
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<MenuItem, 'menuItem'>
