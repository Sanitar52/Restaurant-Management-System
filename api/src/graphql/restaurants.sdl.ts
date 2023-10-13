export const schema = gql`
  type Restaurant {
    id: Int!
    restaurantName: String!
    restaurantCode: Int!
  }

  type Query {
    restaurants: [Restaurant!]! @requireAuth
    restaurant(id: Int!): Restaurant @requireAuth
  }

  input CreateRestaurantInput {
    restaurantName: String!
    restaurantCode: Int!
  }

  input UpdateRestaurantInput {
    restaurantName: String
    restaurantCode: Int
  }

  type Mutation {
    createRestaurant(input: CreateRestaurantInput!): Restaurant! @requireAuth
    updateRestaurant(id: Int!, input: UpdateRestaurantInput!): Restaurant!
      @requireAuth
    deleteRestaurant(id: Int!): Restaurant! @requireAuth
  }
`
