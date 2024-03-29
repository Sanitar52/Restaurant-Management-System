import { OrderStatus } from '.prisma/client'

import type {
  QueryResolvers,
  MutationResolvers,
  OrderRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const orders: QueryResolvers['orders'] = () => {
  return db.order.findMany()
}
export const ordersByUser: QueryResolvers['ordersByUser'] = ({ userId }) => {
  return db.order.findMany({
    where: { userId },
  })
}
export const ordersByRestaurant: QueryResolvers['ordersByRestaurant'] = ({ restaurantCode }) => {
  if (restaurantCode == null || restaurantCode == undefined || !restaurantCode) {
    return db.order.findMany()
  }
  else{
  return db.order.findMany({
    where: { restaurantCode },
  })}
}
export const ordersOnGoing: QueryResolvers['ordersOnGoing'] = () => {
  return db.order.findMany({
    where: { status: { equals: "PENDING"} },
  })
}
export const ordersCompleted: QueryResolvers['ordersCompleted'] = () => {
  return db.order.findMany({
    where: { status: { equals: "COMPLETED"} },
  })
}

export const order: QueryResolvers['order'] = ({ id }) => {
  return db.order.findUnique({
    where: { id },
  })
}


export const createOrder: MutationResolvers['createOrder'] = ({ input }) => {
  return db.order.create({
    data: input,
  })
}

export const updateOrder: MutationResolvers['updateOrder'] = ({
  id,
  input,
}) => {
  return db.order.update({
    data: input,
    where: { id },
  })
}
export const updateOrderStatus: MutationResolvers['updateOrderStatus'] = ({
  id,
  status,
}) => {
  return db.order.update({
    data: { status },
    where: { id },
  })
}

export const deleteOrder: MutationResolvers['deleteOrder'] = ({ id }) => {
  return db.order.delete({
    where: { id },
  })
}

export const Order: OrderRelationResolvers = {
  user: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).user()
  },
  cartMenuItems: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).cartMenuItems()
  },
}
