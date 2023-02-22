import { useRouter } from 'next/router'
import useSWR from 'swr'
import type { Cars, ResponseError } from '../../interfaces'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function PersonPage() {
  const { query } = useRouter()
  const { data, error, isLoading, isValidating } = useSWR<
    Cars,
    ResponseError
  >(() => (query.id ? `/api/car/${query.id}` : null), fetcher)

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  return (
    <div className='mx-12 my-24 flex flex-col gap-5 capitalize leading-6 text-base tracking-wide not-italic font-medium font-sans text-[#000000eb]'>
      <h1>Name: {data.modelName}</h1>
      <h1>Body Type: {data.bodyType}</h1>
      <h1>Model Type: {data.modelName}</h1>
    </div>
  )
}