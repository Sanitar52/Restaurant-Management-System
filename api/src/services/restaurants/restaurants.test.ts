import type { Restaurant } from '@prisma/client'

import {
  restaurants,
  restaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from './restaurants'
import type { StandardScenario } from './restaurants.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('restaurants', () => {
  scenario('returns all restaurants', async (scenario: StandardScenario) => {
    const result = await restaurants()

    expect(result.length).toEqual(Object.keys(scenario.restaurant).length)
  })

  scenario(
    'returns a single restaurant',
    async (scenario: StandardScenario) => {
      const result = await restaurant({ id: scenario.restaurant.one.id })

      expect(result).toEqual(scenario.restaurant.one)
    }
  )

  scenario('creates a restaurant', async () => {
    const result = await createRestaurant({
      input: {
        name: 'String',
        body: 'String',
        logo: 'String',
        restaurantCode: 4839374,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.body).toEqual('String')
    expect(result.logo).toEqual('String')
    expect(result.restaurantCode).toEqual(4839374)
  })

  scenario('updates a restaurant', async (scenario: StandardScenario) => {
    const original = (await restaurant({
      id: scenario.restaurant.one.id,
    })) as Restaurant
    const result = await updateRestaurant({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a restaurant', async (scenario: StandardScenario) => {
    const original = (await deleteRestaurant({
      id: scenario.restaurant.one.id,
    })) as Restaurant
    const result = await restaurant({ id: original.id })

    expect(result).toEqual(null)
  })
})
