import type { Prisma, CartMenuItem } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CartMenuItemCreateArgs>({
  cartMenuItem: {
    one: {
      data: {
        quantity: 8212340,
        updatedAt: '2023-10-17T07:35:20.035Z',
        menuItem: {
          create: {
            name: 'String',
            logo: 'String',
            description: 'String',
            quantity: 7047003,
            price: 196712.2769642704,
            restaurant: {
              create: {
                name: 'String',
                body: 'String',
                logo: 'String',
                restaurantCode: 6533727,
              },
            },
          },
        },
        user: {
          create: {
            email: 'String7536818',
            username: 'String699193',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-10-17T07:35:20.035Z',
          },
        },
      },
    },
    two: {
      data: {
        quantity: 1795694,
        updatedAt: '2023-10-17T07:35:20.035Z',
        menuItem: {
          create: {
            name: 'String',
            logo: 'String',
            description: 'String',
            quantity: 9004419,
            price: 9750424.963546088,
            restaurant: {
              create: {
                name: 'String',
                body: 'String',
                logo: 'String',
                restaurantCode: 543538,
              },
            },
          },
        },
        user: {
          create: {
            email: 'String3470389',
            username: 'String9136768',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-10-17T07:35:20.035Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<CartMenuItem, 'cartMenuItem'>
