export const schema = gql`
  type User {
    id: Int!
    employee: Employee
    name: String
    email: String!
    username: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    role: Role!
    createdAt: DateTime!
    updatedAt: DateTime!
    cartMenuItem: [CartMenuItem]!
    orders: [Order]!
  }

  enum Role {
    ADMIN
    CUSTOMER
    EMPLOYEE
  }

  type Query {
    me: User @requireAuth
    users: [User!]! @skipAuth
    user(id: Int!): User @skipAuth
  }

  input CreateUserInput {
    name: String
    email: String!
    username: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    role: Role!
  }

  input UpdateUserInput {
    name: String
    email: String
    username: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    role: Role
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
