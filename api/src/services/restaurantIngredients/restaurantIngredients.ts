import type {
  QueryResolvers,
  MutationResolvers,
  RestaurantIngredientRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const restaurantIngredients: QueryResolvers['restaurantIngredients'] =
  () => {
    return db.restaurantIngredient.findMany()
  }

export const restaurantIngredient: QueryResolvers['restaurantIngredient'] = ({
  id,
}) => {
  return db.restaurantIngredient.findUnique({
    where: { id },
  })
}

export const createRestaurantIngredient: MutationResolvers['createRestaurantIngredient'] =
  ({ input }) => {
    return db.restaurantIngredient.create({
      data: input,
    })
  }

export const updateRestaurantIngredient: MutationResolvers['updateRestaurantIngredient'] =
  ({ id, input }) => {
    return db.restaurantIngredient.update({
      data: input,
      where: { id },
    })
  }

export const deleteRestaurantIngredient: MutationResolvers['deleteRestaurantIngredient'] =
  ({ id }) => {
    return db.restaurantIngredient.delete({
      where: { id },
    })
  }

export const RestaurantIngredient: RestaurantIngredientRelationResolvers = {
  restaurant: (_obj, { root }) => {
    return db.restaurantIngredient
      .findUnique({ where: { id: root?.id } })
      .restaurant()
  },
}
