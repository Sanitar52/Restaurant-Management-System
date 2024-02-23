export const schema = gql`
  type UserWallet {
    id: Int!
    userId: Int!
    user: User!
    walletAddress: String!
    walletPrivateKey: String!
    walletPublicKey: String!
    walletMnemonic: String!
    walletBalance: Float!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    userWallets: [UserWallet!]! @requireAuth
    userWallet(id: Int!): UserWallet @requireAuth
  }

  input CreateUserWalletInput {
    userId: Int!
    walletAddress: String!
    walletPrivateKey: String!
    walletPublicKey: String!
    walletMnemonic: String!
    walletBalance: Float!
  }

  input UpdateUserWalletInput {
    userId: Int
    walletAddress: String
    walletPrivateKey: String
    walletPublicKey: String
    walletMnemonic: String
    walletBalance: Float
  }

  type Mutation {
    createUserWallet(input: CreateUserWalletInput!): UserWallet! @requireAuth
    updateUserWallet(id: Int!, input: UpdateUserWalletInput!): UserWallet!
      @requireAuth
    deleteUserWallet(id: Int!): UserWallet! @requireAuth
  }
`
