import type { Prisma, Restaurant } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RestaurantCreateArgs>({
  restaurant: {
    one: { data: { restaurantName: 'String', restaurantCode: 9500052 } },
    two: { data: { restaurantName: 'String', restaurantCode: 6168111 } },
  },
})

export type StandardScenario = ScenarioData<Restaurant, 'restaurant'>
