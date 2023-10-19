import type { Prisma, Order } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrderCreateArgs>({
  order: {
    one: {
      data: {
        cartMenuItemIds: 9380214,
        total: 9540320.103356488,
        updatedAt: '2023-10-17T07:35:40.714Z',
        user: {
          create: {
            email: 'String9919673',
            username: 'String9437904',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-10-17T07:35:40.714Z',
          },
        },
      },
    },
    two: {
      data: {
        cartMenuItemIds: 4936939,
        total: 3927888.5345064076,
        updatedAt: '2023-10-17T07:35:40.714Z',
        user: {
          create: {
            email: 'String7248341',
            username: 'String3296834',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-10-17T07:35:40.714Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Order, 'order'>
