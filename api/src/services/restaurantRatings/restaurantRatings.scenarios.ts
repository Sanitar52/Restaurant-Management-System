import type { Prisma, RestaurantRating } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RestaurantRatingCreateArgs>({
  restaurantRating: {
    one: {
      data: {
        rating: 2667804.7384740757,
        restaurant: {
          create: {
            name: 'String',
            body: 'String',
            logo: 'String',
            restaurantCode: 9760802,
            updatedAt: '2023-11-30T11:51:23.570Z',
          },
        },
        user: {
          create: {
            email: 'String6123691',
            username: 'String882656',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-11-30T11:51:23.570Z',
          },
        },
      },
    },
    two: {
      data: {
        rating: 501372.8223359193,
        restaurant: {
          create: {
            name: 'String',
            body: 'String',
            logo: 'String',
            restaurantCode: 797220,
            updatedAt: '2023-11-30T11:51:23.570Z',
          },
        },
        user: {
          create: {
            email: 'String4732757',
            username: 'String5490517',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-11-30T11:51:23.570Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  RestaurantRating,
  'restaurantRating'
>
