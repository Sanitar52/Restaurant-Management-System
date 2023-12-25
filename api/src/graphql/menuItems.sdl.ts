export const schema = gql`
  type MenuItem {
    id: Int!
    restaurantCode: Int!
    restaurant: Restaurant!
    name: String!
    logo: String!
    description: String!
    category: Category!
    quantity: Int!
    price: Float!
    cartMenuItem: [CartMenuItem]!
    createdAt: DateTime!
    updatedAt: DateTime!
    itemIngredients: [ItemIngredient]!
  }

  enum Category {
    APPETIZER
    PIZZA
    BURGER
    MAIN_COURSE
    VEGETARIAN
    DESSERT
    COLDDRINKS
    HOTDRINKS
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
    category: Category!
    quantity: Int!
    price: Float!
  }

  input UpdateMenuItemInput {
    restaurantCode: Int
    name: String
    logo: String
    description: String
    category: Category
    quantity: Int
    price: Float
  }

  type Mutation {
    createMenuItem(input: CreateMenuItemInput!): MenuItem! @requireAuth
    updateMenuItem(id: Int!, input: UpdateMenuItemInput!): MenuItem!
      @requireAuth
    deleteMenuItem(id: Int!): MenuItem! @requireAuth
  }
`
