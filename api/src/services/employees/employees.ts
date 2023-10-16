import type {
  QueryResolvers,
  MutationResolvers,
  EmployeeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const employees: QueryResolvers['employees'] = () => {
  return db.employee.findMany()
}

export const employee: QueryResolvers['employee'] = ({ id }) => {
  return db.employee.findUnique({
    where: { id },
  })
}

export const createEmployee: MutationResolvers['createEmployee'] = ({
  input,
}) => {
  return db.employee.create({
    data: input,
  })
}

export const updateEmployee: MutationResolvers['updateEmployee'] = ({
  id,
  input,
}) => {
  return db.employee.update({
    data: input,
    where: { id },
  })
}

export const deleteEmployee: MutationResolvers['deleteEmployee'] = ({ id }) => {
  return db.employee.delete({
    where: { id },
  })
}

export const Employee: EmployeeRelationResolvers = {
  user: (_obj, { root }) => {
    return db.employee.findUnique({ where: { id: root?.id } }).user()
  },
  restaurant: (_obj, { root }) => {
    return db.employee.findUnique({ where: { id: root?.id } }).restaurant()
  },
}
