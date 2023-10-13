import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const menuItems: QueryResolvers['menuItems'] = () => {
  return db.menuItem.findMany()
}

export const menuItem: QueryResolvers['menuItem'] = ({ id }) => {
  return db.menuItem.findUnique({
    where: { id },
  })
}

export const createMenuItem: MutationResolvers['createMenuItem'] = ({
  input,
}) => {
  return db.menuItem.create({
    data: input,
  })
}

export const updateMenuItem: MutationResolvers['updateMenuItem'] = ({
  id,
  input,
}) => {
  return db.menuItem.update({
    data: input,
    where: { id },
  })
}

export const deleteMenuItem: MutationResolvers['deleteMenuItem'] = ({ id }) => {
  return db.menuItem.delete({
    where: { id },
  })
}
