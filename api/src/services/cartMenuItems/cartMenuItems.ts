import type {
  QueryResolvers,
  MutationResolvers,
  CartMenuItemRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const cartMenuItems: QueryResolvers['cartMenuItems'] = () => {
  return db.cartMenuItem.findMany()
}

export const cartMenuItem: QueryResolvers['cartMenuItem'] = ({ id }) => {
  return db.cartMenuItem.findUnique({
    where: { id },
  })
}

export const createCartMenuItem: MutationResolvers['createCartMenuItem'] = ({
  input,
}) => {
  return db.cartMenuItem.create({
    data: input,
  })
}

export const updateCartMenuItem: MutationResolvers['updateCartMenuItem'] = ({
  id,
  input,
}) => {
  return db.cartMenuItem.update({
    data: input,
    where: { id },
  })
}

export const deleteCartMenuItem: MutationResolvers['deleteCartMenuItem'] = ({
  id,
}) => {
  return db.cartMenuItem.delete({
    where: { id },
  })
}

export const CartMenuItem: CartMenuItemRelationResolvers = {
  menuItem: (_obj, { root }) => {
    return db.cartMenuItem.findUnique({ where: { id: root?.id } }).menuItem()
  },
  user: (_obj, { root }) => {
    return db.cartMenuItem.findUnique({ where: { id: root?.id } }).user()
  },
  order: (_obj, { root }) => {
    return db.cartMenuItem.findUnique({ where: { id: root?.id } }).order()
  },
}
