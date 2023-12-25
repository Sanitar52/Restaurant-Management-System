import type { Prisma, ItemIngredient } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ItemIngredientCreateArgs>({
  itemIngredient: {
    one: {
      data: {
        name: 'String',
        updatedAt: '2023-11-30T11:54:17.801Z',
        menuItem: {
          create: {
            name: 'String',
            logo: 'String',
            description: 'String',
            quantity: 3877789,
            price: 2373094.911019855,
            updatedAt: '2023-11-30T11:54:17.801Z',
            restaurant: {
              create: {
                name: 'String',
                body: 'String',
                logo: 'String',
                restaurantCode: 9091951,
                updatedAt: '2023-11-30T11:54:17.801Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        updatedAt: '2023-11-30T11:54:17.801Z',
        menuItem: {
          create: {
            name: 'String',
            logo: 'String',
            description: 'String',
            quantity: 997668,
            price: 7778204.308255418,
            updatedAt: '2023-11-30T11:54:17.801Z',
            restaurant: {
              create: {
                name: 'String',
                body: 'String',
                logo: 'String',
                restaurantCode: 7480882,
                updatedAt: '2023-11-30T11:54:17.801Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<ItemIngredient, 'itemIngredient'>
