export const schema = gql`
  type Order {
    id: Int!
    userId: Int!
    user: User!
    cartMenuItemIds: [Int]!
    cartMenuItems: [CartMenuItem]!
    status: OrderStatus!
    total: Float!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum OrderStatus {
    PENDING
    COMPLETED
    CANCELLED
  }

  type Query {
    orders: [Order!]! @requireAuth
    order(id: Int!): Order @requireAuth
  }

  input CreateOrderInput {
    userId: Int!
    cartMenuItemIds: [Int]!
    status: OrderStatus!
    total: Float!
  }

  input UpdateOrderInput {
    userId: Int
    cartMenuItemIds: [Int]!
    status: OrderStatus
    total: Float
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order! @requireAuth
    updateOrder(id: Int!, input: UpdateOrderInput!): Order! @requireAuth
    deleteOrder(id: Int!): Order! @requireAuth
  }
`
