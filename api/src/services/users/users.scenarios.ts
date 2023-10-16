import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String6096319',
        username: 'String547275',
        hashedPassword: 'String',
        salt: 'String',
        restaurant: {
          create: {
            name: 'String',
            body: 'String',
            logo: 'String',
            restaurantCode: 945178,
          },
        },
      },
    },
    two: {
      data: {
        email: 'String5495263',
        username: 'String4871183',
        hashedPassword: 'String',
        salt: 'String',
        restaurant: {
          create: {
            name: 'String',
            body: 'String',
            logo: 'String',
            restaurantCode: 9533341,
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
