import type { Prisma, RestaurantIngredient } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RestaurantIngredientCreateArgs>({
  restaurantIngredient: {
    one: {
      data: {
        name: 'String',
        updatedAt: '2023-12-18T10:10:17.845Z',
        restaurant: {
          create: {
            name: 'String',
            body: 'String',
            logo: 'String',
            description: 'String',
            restaurantCode: 6136824,
            updatedAt: '2023-12-18T10:10:17.845Z',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        updatedAt: '2023-12-18T10:10:17.845Z',
        restaurant: {
          create: {
            name: 'String',
            body: 'String',
            logo: 'String',
            description: 'String',
            restaurantCode: 8794059,
            updatedAt: '2023-12-18T10:10:17.845Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  RestaurantIngredient,
  'restaurantIngredient'
>
