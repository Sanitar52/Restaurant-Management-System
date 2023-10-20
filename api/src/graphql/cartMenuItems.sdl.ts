export const schema = gql`
  type CartMenuItem {
    id: Int!
    menuItemId: Int!
    menuItem: MenuItem!
    orderPrice: Float
    quantity: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: Int!
    user: User!
    orderId: Int
    order: Order
    inCart: Boolean!
  }

  type Query {
    cartMenuItems: [CartMenuItem!]! @requireAuth
    cartMenuItem(id: Int!): CartMenuItem @requireAuth
    cartMenuItemsByUser(userId: Int!): [CartMenuItem!]! @requireAuth
  }

  input CreateCartMenuItemInput {
    menuItemId: Int!
    orderPrice: Float
    quantity: Int!
    userId: Int!
    orderId: Int
    inCart: Boolean!
  }

  input UpdateCartMenuItemInput {
    menuItemId: Int
    orderPrice: Float
    quantity: Int
    userId: Int
    orderId: Int
    inCart: Boolean
  }

  type Mutation {
    createCartMenuItem(input: CreateCartMenuItemInput!): CartMenuItem!
      @requireAuth
    updateCartMenuItem(
      id: Int!
      input: UpdateCartMenuItemInput!
    ): CartMenuItem! @requireAuth
    deleteCartMenuItem(id: Int!): CartMenuItem! @requireAuth
  }
`
