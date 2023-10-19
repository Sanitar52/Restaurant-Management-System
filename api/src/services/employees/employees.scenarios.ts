import type { Prisma, Employee } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EmployeeCreateArgs>({
  employee: {
    one: {
      data: {
        user: {
          create: {
            email: 'String3980206',
            username: 'String4512398',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-10-17T07:18:23.372Z',
          },
        },
        restaurant: {
          create: {
            name: 'String',
            body: 'String',
            logo: 'String',
            restaurantCode: 164380,
          },
        },
      },
    },
    two: {
      data: {
        user: {
          create: {
            email: 'String9731914',
            username: 'String30564',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2023-10-17T07:18:23.372Z',
          },
        },
        restaurant: {
          create: {
            name: 'String',
            body: 'String',
            logo: 'String',
            restaurantCode: 6132515,
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Employee, 'employee'>
