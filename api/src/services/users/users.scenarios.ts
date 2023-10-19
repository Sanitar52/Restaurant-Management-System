import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String1929908',
        username: 'String6608846',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2023-10-17T07:17:13.835Z',
      },
    },
    two: {
      data: {
        email: 'String6058687',
        username: 'String1167294',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2023-10-17T07:17:13.835Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
