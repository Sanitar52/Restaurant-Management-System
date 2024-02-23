import type { userWallet } from '@prisma/client'

import {
  userWallets,
  userWallet,
  createUserWallet,
  updateUserWallet,
  deleteUserWallet,
} from './userWallets'
import type { StandardScenario } from './userWallets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userWallets', () => {
  scenario('returns all userWallets', async (scenario: StandardScenario) => {
    const result = await userWallets()

    expect(result.length).toEqual(Object.keys(scenario.userWallet).length)
  })

  scenario(
    'returns a single userWallet',
    async (scenario: StandardScenario) => {
      const result = await userWallet({ id: scenario.userWallet.one.id })

      expect(result).toEqual(scenario.userWallet.one)
    }
  )

  scenario('creates a userWallet', async (scenario: StandardScenario) => {
    const result = await createUserWallet({
      input: {
        userId: scenario.userWallet.two.userId,
        walletAddress: 'String1363703',
        walletPrivateKey: 'String8618419',
        walletPublicKey: 'String4750858',
        walletMnemonic: 'String3953797',
        updatedAt: '2024-02-02T15:45:19.970Z',
      },
    })

    expect(result.userId).toEqual(scenario.userWallet.two.userId)
    expect(result.walletAddress).toEqual('String1363703')
    expect(result.walletPrivateKey).toEqual('String8618419')
    expect(result.walletPublicKey).toEqual('String4750858')
    expect(result.walletMnemonic).toEqual('String3953797')
    expect(result.updatedAt).toEqual(new Date('2024-02-02T15:45:19.970Z'))
  })

  scenario('updates a userWallet', async (scenario: StandardScenario) => {
    const original = (await userWallet({
      id: scenario.userWallet.one.id,
    })) as userWallet
    const result = await updateUserWallet({
      id: original.id,
      input: { walletAddress: 'String58859882' },
    })

    expect(result.walletAddress).toEqual('String58859882')
  })

  scenario('deletes a userWallet', async (scenario: StandardScenario) => {
    const original = (await deleteUserWallet({
      id: scenario.userWallet.one.id,
    })) as userWallet
    const result = await userWallet({ id: original.id })

    expect(result).toEqual(null)
  })
})
