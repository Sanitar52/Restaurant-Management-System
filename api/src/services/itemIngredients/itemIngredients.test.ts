import type { ItemIngredient } from '@prisma/client'

import {
  itemIngredients,
  itemIngredient,
  createItemIngredient,
  updateItemIngredient,
  deleteItemIngredient,
} from './itemIngredients'
import type { StandardScenario } from './itemIngredients.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('itemIngredients', () => {
  scenario(
    'returns all itemIngredients',
    async (scenario: StandardScenario) => {
      const result = await itemIngredients()

      expect(result.length).toEqual(Object.keys(scenario.itemIngredient).length)
    }
  )

  scenario(
    'returns a single itemIngredient',
    async (scenario: StandardScenario) => {
      const result = await itemIngredient({
        id: scenario.itemIngredient.one.id,
      })

      expect(result).toEqual(scenario.itemIngredient.one)
    }
  )

  scenario('creates a itemIngredient', async (scenario: StandardScenario) => {
    const result = await createItemIngredient({
      input: {
        menuItemId: scenario.itemIngredient.two.menuItemId,
        name: 'String',
        updatedAt: '2023-11-30T11:54:17.693Z',
      },
    })

    expect(result.menuItemId).toEqual(scenario.itemIngredient.two.menuItemId)
    expect(result.name).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-11-30T11:54:17.693Z'))
  })

  scenario('updates a itemIngredient', async (scenario: StandardScenario) => {
    const original = (await itemIngredient({
      id: scenario.itemIngredient.one.id,
    })) as ItemIngredient
    const result = await updateItemIngredient({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a itemIngredient', async (scenario: StandardScenario) => {
    const original = (await deleteItemIngredient({
      id: scenario.itemIngredient.one.id,
    })) as ItemIngredient
    const result = await itemIngredient({ id: original.id })

    expect(result).toEqual(null)
  })
})
