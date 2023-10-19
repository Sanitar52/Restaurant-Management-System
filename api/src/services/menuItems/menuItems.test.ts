import type { MenuItem } from '@prisma/client'

import {
  menuItems,
  menuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from './menuItems'
import type { StandardScenario } from './menuItems.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('menuItems', () => {
  scenario('returns all menuItems', async (scenario: StandardScenario) => {
    const result = await menuItems()

    expect(result.length).toEqual(Object.keys(scenario.menuItem).length)
  })

  scenario('returns a single menuItem', async (scenario: StandardScenario) => {
    const result = await menuItem({ id: scenario.menuItem.one.id })

    expect(result).toEqual(scenario.menuItem.one)
  })

  scenario('creates a menuItem', async (scenario: StandardScenario) => {
    const result = await createMenuItem({
      input: {
        restaurantCode: scenario.menuItem.two.restaurantCode,
        name: 'String',
        logo: 'String',
        description: 'String',
        quantity: 9321874,
        price: 6267792.936862782,
      },
    })

    expect(result.restaurantCode).toEqual(scenario.menuItem.two.restaurantCode)
    expect(result.name).toEqual('String')
    expect(result.logo).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.quantity).toEqual(9321874)
    expect(result.price).toEqual(6267792.936862782)
  })

  scenario('updates a menuItem', async (scenario: StandardScenario) => {
    const original = (await menuItem({
      id: scenario.menuItem.one.id,
    })) as MenuItem
    const result = await updateMenuItem({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a menuItem', async (scenario: StandardScenario) => {
    const original = (await deleteMenuItem({
      id: scenario.menuItem.one.id,
    })) as MenuItem
    const result = await menuItem({ id: original.id })

    expect(result).toEqual(null)
  })
})
