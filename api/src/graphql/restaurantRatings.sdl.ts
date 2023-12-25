export const schema = gql`
  type RestaurantRating {
    id: Int!
    restaurantCode: Int!
    restaurant: Restaurant!
    rating: Float!
    userId: Int!
    user: User!
  }

  type Query {
    restaurantRatings: [RestaurantRating!]! @requireAuth
    restaurantRating(id: Int!): RestaurantRating @requireAuth
  }

  input CreateRestaurantRatingInput {
    restaurantCode: Int!
    rating: Float!
    userId: Int!
  }

  input UpdateRestaurantRatingInput {
    restaurantCode: Int
    rating: Float
    userId: Int
  }

  type Mutation {
    createRestaurantRating(
      input: CreateRestaurantRatingInput!
    ): RestaurantRating! @requireAuth
    updateRestaurantRating(
      id: Int!
      input: UpdateRestaurantRatingInput!
    ): RestaurantRating! @requireAuth
    deleteRestaurantRating(id: Int!): RestaurantRating! @requireAuth
  }
`
