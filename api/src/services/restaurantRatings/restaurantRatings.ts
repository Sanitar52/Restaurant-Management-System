import type {
  QueryResolvers,
  MutationResolvers,
  RestaurantRatingRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const restaurantRatings: QueryResolvers['restaurantRatings'] = () => {
  return db.restaurantRating.findMany()
}

export const restaurantRating: QueryResolvers['restaurantRating'] = ({
  id,
}) => {
  return db.restaurantRating.findUnique({
    where: { id },
  })
}

export const createRestaurantRating: MutationResolvers['createRestaurantRating'] =
  ({ input }) => {
    return db.restaurantRating.create({
      data: input,
    })
  }

export const updateRestaurantRating: MutationResolvers['updateRestaurantRating'] =
  ({ id, input }) => {
    return db.restaurantRating.update({
      data: input,
      where: { id },
    })
  }

export const deleteRestaurantRating: MutationResolvers['deleteRestaurantRating'] =
  ({ id }) => {
    return db.restaurantRating.delete({
      where: { id },
    })
  }

export const RestaurantRating: RestaurantRatingRelationResolvers = {
  restaurant: (_obj, { root }) => {
    return db.restaurantRating
      .findUnique({ where: { id: root?.id } })
      .restaurant()
  },
  user: (_obj, { root }) => {
    return db.restaurantRating.findUnique({ where: { id: root?.id } }).user()
  },
}
