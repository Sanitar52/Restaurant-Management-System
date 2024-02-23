import type {
  QueryResolvers,
  MutationResolvers,
  UserWalletRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userWallets: QueryResolvers['userWallets'] = () => {
  return db.userWallet.findMany()
}

export const userWallet: QueryResolvers['userWallet'] = ({ id }) => {
  return db.userWallet.findUnique({
    where: { id },
  })
}

export const createUserWallet: MutationResolvers['createUserWallet'] = ({
  input,
}) => {
  return db.userWallet.create({
    data: input,
  })
}

export const updateUserWallet: MutationResolvers['updateUserWallet'] = ({
  id,
  input,
}) => {
  return db.userWallet.update({
    data: input,
    where: { id },
  })
}

export const deleteUserWallet: MutationResolvers['deleteUserWallet'] = ({
  id,
}) => {
  return db.userWallet.delete({
    where: { id },
  })
}

export const UserWallet: UserWalletRelationResolvers = {
  user: (_obj, { root }) => {
    return db.userWallet.findUnique({ where: { id: root?.id } }).user()
  },
}
