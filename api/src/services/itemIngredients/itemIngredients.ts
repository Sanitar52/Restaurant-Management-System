import type {
  QueryResolvers,
  MutationResolvers,
  ItemIngredientRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const itemIngredients: QueryResolvers['itemIngredients'] = () => {
  return db.itemIngredient.findMany()
}

export const itemIngredient: QueryResolvers['itemIngredient'] = ({ id }) => {
  return db.itemIngredient.findUnique({
    where: { id },
  })
}

export const createItemIngredient: MutationResolvers['createItemIngredient'] =
  ({ input }) => {
    return db.itemIngredient.create({
      data: input,
    })
  }

export const updateItemIngredient: MutationResolvers['updateItemIngredient'] =
  ({ id, input }) => {
    return db.itemIngredient.update({
      data: input,
      where: { id },
    })
  }

export const deleteItemIngredient: MutationResolvers['deleteItemIngredient'] =
  ({ id }) => {
    return db.itemIngredient.delete({
      where: { id },
    })
  }

export const ItemIngredient: ItemIngredientRelationResolvers = {
  menuItem: (_obj, { root }) => {
    return db.itemIngredient.findUnique({ where: { id: root?.id } }).menuItem()
  },
}
