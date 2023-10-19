export const schema = gql`
  type Restaurant {
    id: Int!
    employee: [Employee]!
    menuItems: [MenuItem]!
    name: String!
    body: String!
    logo: String!
    restaurantCode: Int!
  }

  type Query {
    restaurants: [Restaurant!]! @skipAuth
    restaurant(id: Int!): Restaurant @skipAuth
  }

  input CreateRestaurantInput {
    name: String!
    body: String!
    logo: String!
    restaurantCode: Int!
  }

  input UpdateRestaurantInput {
    name: String
    body: String
    logo: String
    restaurantCode: Int
  }

  type Mutation {
    createRestaurant(input: CreateRestaurantInput!): Restaurant! @requireAuth
    updateRestaurant(id: Int!, input: UpdateRestaurantInput!): Restaurant!
      @requireAuth
    deleteRestaurant(id: Int!): Restaurant! @requireAuth
  }
`
