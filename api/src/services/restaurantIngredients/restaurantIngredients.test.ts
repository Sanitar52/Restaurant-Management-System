import type { RestaurantIngredient } from '@prisma/client'

import {
  restaurantIngredients,
  restaurantIngredient,
  createRestaurantIngredient,
  updateRestaurantIngredient,
  deleteRestaurantIngredient,
} from './restaurantIngredients'
import type { StandardScenario } from './restaurantIngredients.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('restaurantIngredients', () => {
  scenario(
    'returns all restaurantIngredients',
    async (scenario: StandardScenario) => {
      const result = await restaurantIngredients()

      expect(result.length).toEqual(
        Object.keys(scenario.restaurantIngredient).length
      )
    }
  )

  scenario(
    'returns a single restaurantIngredient',
    async (scenario: StandardScenario) => {
      const result = await restaurantIngredient({
        id: scenario.restaurantIngredient.one.id,
      })

      expect(result).toEqual(scenario.restaurantIngredient.one)
    }
  )

  scenario(
    'creates a restaurantIngredient',
    async (scenario: StandardScenario) => {
      const result = await createRestaurantIngredient({
        input: {
          restaurantCode: scenario.restaurantIngredient.two.restaurantCode,
          name: 'String',
          updatedAt: '2023-12-18T10:10:17.804Z',
        },
      })

      expect(result.restaurantCode).toEqual(
        scenario.restaurantIngredient.two.restaurantCode
      )
      expect(result.name).toEqual('String')
      expect(result.updatedAt).toEqual(new Date('2023-12-18T10:10:17.804Z'))
    }
  )

  scenario(
    'updates a restaurantIngredient',
    async (scenario: StandardScenario) => {
      const original = (await restaurantIngredient({
        id: scenario.restaurantIngredient.one.id,
      })) as RestaurantIngredient
      const result = await updateRestaurantIngredient({
        id: original.id,
        input: { name: 'String2' },
      })

      expect(result.name).toEqual('String2')
    }
  )

  scenario(
    'deletes a restaurantIngredient',
    async (scenario: StandardScenario) => {
      const original = (await deleteRestaurantIngredient({
        id: scenario.restaurantIngredient.one.id,
      })) as RestaurantIngredient
      const result = await restaurantIngredient({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
