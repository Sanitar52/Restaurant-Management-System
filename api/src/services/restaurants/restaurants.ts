import type {
  QueryResolvers,
  MutationResolvers,
  RestaurantRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const restaurants: QueryResolvers['restaurants'] = () => {
  return db.restaurant.findMany()
}

export const restaurant: QueryResolvers['restaurant'] = ({ id }) => {
  return db.restaurant.findUnique({
    where: { id },
  })
}
export const restaurantByName: QueryResolvers['restaurantByName'] = ({ name }) => {
  return db.restaurant.findMany({
    where: { name },
  })
}

export const createRestaurant: MutationResolvers['createRestaurant'] = ({
  input,
}) => {
  return db.restaurant.create({
    data: input,
  })
}

export const updateRestaurant: MutationResolvers['updateRestaurant'] = ({
  id,
  input,
}) => {
  return db.restaurant.update({
    data: input,
    where: { id },
  })
}

export const deleteRestaurant: MutationResolvers['deleteRestaurant'] = ({
  id,
}) => {
  return db.restaurant.delete({
    where: { id },
  })
}

export const Restaurant: RestaurantRelationResolvers = {
  employee: (_obj, { root }) => {
    return db.restaurant.findUnique({ where: { id: root?.id } }).employee()
  },
  menuItems: (_obj, { root }) => {
    return db.restaurant.findUnique({ where: { id: root?.id } }).menuItems()
  },
}
