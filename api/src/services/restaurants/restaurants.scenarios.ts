import type { Prisma, Restaurant } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RestaurantCreateArgs>({
  restaurant: {
    one: {
      data: {
        name: 'String',
        body: 'String',
        logo: 'String',
        restaurantCode: 6837426,
      },
    },
    two: {
      data: {
        name: 'String',
        body: 'String',
        logo: 'String',
        restaurantCode: 214411,
      },
    },
  },
})

export type StandardScenario = ScenarioData<Restaurant, 'restaurant'>
