import { NextApiRequest, NextApiResponse } from 'next'
import { cars } from '../../../public/api/cars'
import type { Cars, ResponseError } from '../../../interfaces'

export default function carHandler(
  req: NextApiRequest,
  res: NextApiResponse<Cars | ResponseError>
) {
  const { query } = req
  const { id } = query
  const car = cars.find((p) => p.id === id)

  // Car with id exists
  return car
    ? res.status(200).json(car)
    : res.status(404).json({ message: `Car with id: ${id} not found.` })
}