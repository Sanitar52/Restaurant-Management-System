export const schema = gql`
  type RestaurantIngredient {
    id: Int!
    restaurantCode: Int!
    restaurant: Restaurant!
    name: String!
    quantity: Float
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    restaurantIngredients: [RestaurantIngredient!]! @requireAuth
    restaurantIngredient(id: Int!): RestaurantIngredient @requireAuth
  }

  input CreateRestaurantIngredientInput {
    restaurantCode: Int!
    name: String!
    quantity: Float
  }

  input UpdateRestaurantIngredientInput {
    restaurantCode: Int
    name: String
    quantity: Float
  }

  type Mutation {
    createRestaurantIngredient(
      input: CreateRestaurantIngredientInput!
    ): RestaurantIngredient! @requireAuth
    updateRestaurantIngredient(
      id: Int!
      input: UpdateRestaurantIngredientInput!
    ): RestaurantIngredient! @requireAuth
    deleteRestaurantIngredient(id: Int!): RestaurantIngredient! @requireAuth
  }
`
