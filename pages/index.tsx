import Slider from 'react-slick';
import Image from 'next/image'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useSWR from 'swr'
import type { Cars } from '../interfaces'
import SamplePrevArrow from '../components/PrevArrow';
import SampleNextArrow from '../components/NextArrow';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  arrows: true,
  infinite: true,
  focusOnSelect: true,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index() {
  const { data, error, isLoading } = useSWR<Cars[]>('/api/car', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  return (
    <div>
    <Slider {...settings}>
    {data.map((t,index) => (
        <div key={index}>
          <h3>{t.bodyType}</h3>
          <h1>{t.modelName}</h1><h2>{t.modelType}</h2>
          <Image
            src={t.imageUrl}
            alt="Picture of the author"
            width={300}
            height={300}
          />
          <Link href="/car/[id]" as={`/car/${t.id}`}>Learn  </Link>
          <Link href="https://www.volvocars.com/in/v/cars/s90/shop">Shop  </Link>
        </div>
      ))}
    </Slider>
  </div>
  )
}

