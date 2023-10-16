export const schema = gql`
  type MenuItem {
    id: Int!
    restaurantCode: Int!
    restaurant: Restaurant!
    name: String!
    logo: String!
    description: String!
    quantity: Int!
  }

  type Query {
    menuItems: [MenuItem!]! @skipAuth
    menuItem(id: Int!): MenuItem @skipAuth
  }

  input CreateMenuItemInput {
    restaurantCode: Int!
    name: String!
    logo: String!
    description: String!
    quantity: Int!
  }

  input UpdateMenuItemInput {
    restaurantCode: Int
    name: String
    logo: String
    description: String
    quantity: Int
  }

  type Mutation {
    createMenuItem(input: CreateMenuItemInput!): MenuItem! @skipAuth
    updateMenuItem(id: Int!, input: UpdateMenuItemInput!): MenuItem!
      @requireAuth
    deleteMenuItem(id: Int!): MenuItem! @requireAuth
  }
`
