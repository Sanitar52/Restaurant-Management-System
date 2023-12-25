export const schema = gql`
  type ItemIngredient {
    id: Int!
    menuItemId: Int!
    menuItem: MenuItem!
    name: String!
    quantity: Float
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    itemIngredients: [ItemIngredient!]! @requireAuth
    itemIngredient(id: Int!): ItemIngredient @requireAuth
  }

  input CreateItemIngredientInput {
    menuItemId: Int!
    name: String!
    quantity: Float
  }

  input UpdateItemIngredientInput {
    menuItemId: Int
    name: String
    quantity: Float
  }

  type Mutation {
    createItemIngredient(input: CreateItemIngredientInput!): ItemIngredient!
      @requireAuth
    updateItemIngredient(
      id: Int!
      input: UpdateItemIngredientInput!
    ): ItemIngredient! @requireAuth
    deleteItemIngredient(id: Int!): ItemIngredient! @requireAuth
  }
`
