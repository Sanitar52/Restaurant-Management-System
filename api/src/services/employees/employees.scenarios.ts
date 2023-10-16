import type { Prisma, Employee } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EmployeeCreateArgs>({
  employee: {
    one: {
      data: {
        user: {
          create: {
            email: 'String621944',
            username: 'String7603681',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        restaurant: {
          create: {
            name: 'String',
            body: 'String',
            logo: 'String',
            restaurantCode: 8278464,
          },
        },
      },
    },
    two: {
      data: {
        user: {
          create: {
            email: 'String3732743',
            username: 'String9504924',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        restaurant: {
          create: {
            name: 'String',
            body: 'String',
            logo: 'String',
            restaurantCode: 2897039,
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Employee, 'employee'>
