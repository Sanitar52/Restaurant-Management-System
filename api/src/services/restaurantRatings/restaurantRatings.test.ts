import type { RestaurantRating } from '@prisma/client'

import {
  restaurantRatings,
  restaurantRating,
  createRestaurantRating,
  updateRestaurantRating,
  deleteRestaurantRating,
} from './restaurantRatings'
import type { StandardScenario } from './restaurantRatings.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('restaurantRatings', () => {
  scenario(
    'returns all restaurantRatings',
    async (scenario: StandardScenario) => {
      const result = await restaurantRatings()

      expect(result.length).toEqual(
        Object.keys(scenario.restaurantRating).length
      )
    }
  )

  scenario(
    'returns a single restaurantRating',
    async (scenario: StandardScenario) => {
      const result = await restaurantRating({
        id: scenario.restaurantRating.one.id,
      })

      expect(result).toEqual(scenario.restaurantRating.one)
    }
  )

  scenario('creates a restaurantRating', async (scenario: StandardScenario) => {
    const result = await createRestaurantRating({
      input: {
        restaurantCode: scenario.restaurantRating.two.restaurantCode,
        rating: 3542930.868441805,
        userId: scenario.restaurantRating.two.userId,
      },
    })

    expect(result.restaurantCode).toEqual(
      scenario.restaurantRating.two.restaurantCode
    )
    expect(result.rating).toEqual(3542930.868441805)
    expect(result.userId).toEqual(scenario.restaurantRating.two.userId)
  })

  scenario('updates a restaurantRating', async (scenario: StandardScenario) => {
    const original = (await restaurantRating({
      id: scenario.restaurantRating.one.id,
    })) as RestaurantRating
    const result = await updateRestaurantRating({
      id: original.id,
      input: { rating: 390075.8962906559 },
    })

    expect(result.rating).toEqual(390075.8962906559)
  })

  scenario('deletes a restaurantRating', async (scenario: StandardScenario) => {
    const original = (await deleteRestaurantRating({
      id: scenario.restaurantRating.one.id,
    })) as RestaurantRating
    const result = await restaurantRating({ id: original.id })

    expect(result).toEqual(null)
  })
})
