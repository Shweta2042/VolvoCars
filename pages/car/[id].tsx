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
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Body Type</th>
          <th>Model Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {isValidating ? (
            <td colSpan={7} align="center">
              Validating...
            </td>
          ) : (
            <>
              <td>{data.modelName}</td>
              <td>{data.bodyType}</td>
              <td>{data.modelType}</td>
            </>
          )}
        </tr>
      </tbody>
    </table>
  )
}