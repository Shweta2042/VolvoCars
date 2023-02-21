import Slider from 'react-slick';
import Image from 'next/image'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useSWR from 'swr'
import type { Cars } from '../interfaces'
import SamplePrevArrow from '../components/PrevArrow';
import SampleNextArrow from '../components/NextArrow';
import Learn from '../components/Learn';

const settings = {
  speed: 500,
  slidesToScroll: 1,
  infinite: false,
  responsive: [
    {
      breakpoint: 2000,
      settings: {
        slidesToShow: 4,
        dots: true,
      }
    },
    {
      breakpoint: 2000,
      settings: {
        slidesToShow: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        arrows: true,
      }
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        arrows: true,
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        arrows: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        dots: true,
        
      }
    }
  ]
};

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index() {
  const { data, error, isLoading } = useSWR<Cars[]>('/api/car', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  return (
    <div className='mx-24'><div className="leading-5 text-2xl not-italic font-medium font-sans my-24 flex justify-center text-[#000000eb]">All Models</div>
    <div className="flex flex-col gap-x-10">
      <Slider {...settings}>
        {data.map((t, index) => (
          <div key={index}>
            <h1 className="uppercase leading-relaxed text-sm tracking-wide not-italic font-medium font-sans text-[#0000008f] mb-2">
              {t.bodyType}
            </h1>
            <h1 className="capitalize leading-6 text-base tracking-wide not-italic font-medium font-sans text-[#000000eb] mb-5">{t.modelName}
              <span className="lowercase leading-6 text-base tracking-wide not-italic font-light font-sans text-[#0000008f]">  {t.modelType}</span>
            </h1>
            <Image
              className='h-300 w-300'
              src={t.imageUrl}
              alt="Picture of the author"
              width={300}
              height={300} />
            <div className = 'flex flex-row flex-1 gap-x-4 mt-5 text-[#2a609d]'>
              <Link href="/car/[id]" as={`/car/${t.id}`}> <Learn data = {{title:"Learn"}}/></Link>
              <Link href="https://www.volvocars.com/in/v/cars/s90/shop"> <Learn data = {{title:"Shop"}}/>  </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div></div>
  )
}

