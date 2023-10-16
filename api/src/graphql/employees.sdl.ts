export const schema = gql`
  type Employee {
    id: Int!
    userid: Int!
    restaurantCode: Int!
    user: User!
    restaurant: Restaurant!
  }

  type Query {
    employees: [Employee!]! @skipAuth
    employee(id: Int!): Employee @skipAuth
  }

  input CreateEmployeeInput {
    userid: Int!
    restaurantCode: Int!
  }

  input UpdateEmployeeInput {
    userid: Int
    restaurantCode: Int
  }

  type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee! @requireAuth
    updateEmployee(id: Int!, input: UpdateEmployeeInput!): Employee!
      @requireAuth
    deleteEmployee(id: Int!): Employee! @requireAuth
  }
`
