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
import { useState } from 'react';


const fetcher = (url: string) => fetch(url).then((res) => res.json())
let noOfCards = 1 

export default function Index() {
  const [slideToShow, setSlideToShow] = useState(noOfCards)
  const settings = {
  speed: 500,
  slidesToScroll: 1,
  infinite: false,
  slidesToShow: noOfCards,
  nextArrow: noOfCards <= 1 ? false : <SampleNextArrow />,
  prevArrow: noOfCards  <= 1 ? false : <SamplePrevArrow />,
  arrows: noOfCards <= 1 ? false : true,
  dots: noOfCards <= 1 ? true : false,
  onReInit: function() {
    const slickSlider = document.getElementsByClassName("slick-slider") as HTMLCollectionOf<HTMLElement>;
    const slickSlide = document.getElementsByClassName("slick-slide") as HTMLCollectionOf<HTMLElement>;
    const slickSliderWidth = slickSlider?.[0]?.clientWidth
    const slickSlideWidth = slickSlide?.[0]?.clientHeight
    const slideNumber =  slickSliderWidth / (slickSlideWidth+12);
    noOfCards = Math.sign(slideNumber) > 0 ? slideNumber  > 1 ? slideNumber : 1 :1;
    console.log(noOfCards, slickSliderWidth, slickSlideWidth, "in function");
    setSlideToShow(noOfCards);
  },
};

console.log(noOfCards,"in elemnet");

  const { data, error, isLoading } = useSWR<Cars[]>('/api/car', fetcher)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  return (
    <div aria-live="polite" className='mx-24'><div className="leading-5 text-2xl not-italic font-medium font-sans my-24 flex justify-center text-[#000000eb]">All Models</div>
    <div className="flex flex-col gap-x-10">
      <Slider {...settings}>
        {data.map((t, index) => (
          <div key={index}>
            <h1 className="uppercase leading-relaxed text-sm tracking-wide not-italic font-medium font-sans text-[#0000008f] mb-2">
              {t.bodyType}
            </h1>
            <h1 className="capitalize leading-6 text-base tracking-wide not-italic font-medium font-sans text-[#000000eb] mb-5">{t.modelName}
              <span role="img" aria-label="from" className="lowercase leading-6 text-base tracking-wide not-italic font-light font-sans text-[#0000008f]">  {t.modelType}</span>
            </h1>
            <Image
              data-i18n-title={t.modelName}
              title={t.modelName}
              aria-label= {t.modelName}
              className='hover:scale-105'
              src={t.imageUrl}
              alt="Picture of the author"
              width={300}
              height={300} />
            <div className = 'flex flex-row flex-1 gap-x-10 mt-5 text-[#2a609d] justify-center'>
              <Link href="/car/[id]" as={`/car/${t.id}`}> <Learn data = {{title:"Learn", i18Title: "Learn More about car" }}/></Link>
              <Link href="https://www.volvocars.com/in/v/cars/s90/shop"> <Learn data = {{title:"Shop", i18Title: "Shop Car"}}/>  </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div></div>
  )
}

