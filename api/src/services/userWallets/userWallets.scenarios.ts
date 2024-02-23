import type { Prisma, userWallet } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.userWalletCreateArgs>({
  userWallet: {
    one: {
      data: {
        walletAddress: 'String9523330',
        walletPrivateKey: 'String9728380',
        walletPublicKey: 'String1684565',
        walletMnemonic: 'String3442690',
        updatedAt: '2024-02-02T15:45:20.015Z',
        user: {
          create: {
            email: 'String6830790',
            username: 'String169323',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2024-02-02T15:45:20.015Z',
          },
        },
      },
    },
    two: {
      data: {
        walletAddress: 'String6997299',
        walletPrivateKey: 'String2929390',
        walletPublicKey: 'String1448287',
        walletMnemonic: 'String2398705',
        updatedAt: '2024-02-02T15:45:20.015Z',
        user: {
          create: {
            email: 'String8153603',
            username: 'String2601617',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2024-02-02T15:45:20.015Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<userWallet, 'userWallet'>
