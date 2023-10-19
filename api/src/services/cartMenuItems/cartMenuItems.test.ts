import type { CartMenuItem } from '@prisma/client'

import {
  cartMenuItems,
  cartMenuItem,
  createCartMenuItem,
  updateCartMenuItem,
  deleteCartMenuItem,
} from './cartMenuItems'
import type { StandardScenario } from './cartMenuItems.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('cartMenuItems', () => {
  scenario('returns all cartMenuItems', async (scenario: StandardScenario) => {
    const result = await cartMenuItems()

    expect(result.length).toEqual(Object.keys(scenario.cartMenuItem).length)
  })

  scenario(
    'returns a single cartMenuItem',
    async (scenario: StandardScenario) => {
      const result = await cartMenuItem({ id: scenario.cartMenuItem.one.id })

      expect(result).toEqual(scenario.cartMenuItem.one)
    }
  )

  scenario('creates a cartMenuItem', async (scenario: StandardScenario) => {
    const result = await createCartMenuItem({
      input: {
        menuItemId: scenario.cartMenuItem.two.menuItemId,
        quantity: 4668442,
        updatedAt: '2023-10-17T07:35:19.937Z',
        userId: scenario.cartMenuItem.two.userId,
      },
    })

    expect(result.menuItemId).toEqual(scenario.cartMenuItem.two.menuItemId)
    expect(result.quantity).toEqual(4668442)
    expect(result.updatedAt).toEqual(new Date('2023-10-17T07:35:19.937Z'))
    expect(result.userId).toEqual(scenario.cartMenuItem.two.userId)
  })

  scenario('updates a cartMenuItem', async (scenario: StandardScenario) => {
    const original = (await cartMenuItem({
      id: scenario.cartMenuItem.one.id,
    })) as CartMenuItem
    const result = await updateCartMenuItem({
      id: original.id,
      input: { quantity: 329423 },
    })

    expect(result.quantity).toEqual(329423)
  })

  scenario('deletes a cartMenuItem', async (scenario: StandardScenario) => {
    const original = (await deleteCartMenuItem({
      id: scenario.cartMenuItem.one.id,
    })) as CartMenuItem
    const result = await cartMenuItem({ id: original.id })

    expect(result).toEqual(null)
  })
})
