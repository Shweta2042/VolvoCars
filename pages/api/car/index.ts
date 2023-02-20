import { NextApiResponse, NextApiRequest } from 'next'
import { cars } from '../../../public/api/cars'
import type { Cars } from '../../../interfaces'

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Cars[]>
) {
  return res.status(200).json(cars)
}