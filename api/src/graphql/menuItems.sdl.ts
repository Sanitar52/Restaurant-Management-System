export const schema = gql`
  type MenuItem {
    id: Int!
    name: String!
  }

  type Query {
    menuItems: [MenuItem!]! @requireAuth
    menuItem(id: Int!): MenuItem @requireAuth
  }

  input CreateMenuItemInput {
    name: String!
  }

  input UpdateMenuItemInput {
    name: String
  }

  type Mutation {
    createMenuItem(input: CreateMenuItemInput!): MenuItem! @requireAuth
    updateMenuItem(id: Int!, input: UpdateMenuItemInput!): MenuItem!
      @requireAuth
    deleteMenuItem(id: Int!): MenuItem! @requireAuth
  }
`
