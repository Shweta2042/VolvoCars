import Slider from 'react-slick';
import Image from 'next/image'
import Link from 'next/link'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useSWR from 'swr'
import type { Cars } from '../interfaces'
import PrevArrow from '../components/PrevArrow';
import NextArrow from '../components/NextArrow';
import Learn from '../components/Learn';
import { useState } from 'react';
import Head from 'next/head';


const fetcher = (url: string) => fetch(url).then((res) => res.json())
let noOfCards = 1 

export default function Index() {
  const { data, error, isLoading } = useSWR<Cars[]>('/api/car', fetcher)  //fetch car data from a file
  const [slideToShow, setSlideToShow] = useState(noOfCards)     //no of slide to show 
  const [filterCar, setFilterCar] = useState([])     //no filter

  //Slick settings
  const settings = {
  speed: 500,
  slidesToScroll: 1,
  infinite: false,
  slidesToShow: slideToShow,
  nextArrow: noOfCards <= 1 ? false : <NextArrow />,
  prevArrow: noOfCards  <= 1 ? false : <PrevArrow />,
  arrows: noOfCards <= 1 ? false : true,
  dots: noOfCards <= 1 ? true : false,
  onReInit: function() {
    const slickSlider = document.getElementsByClassName("slick-slider") as HTMLCollectionOf<HTMLElement>;
    const slickSlide = document.getElementsByClassName("slick-slide") as HTMLCollectionOf<HTMLElement>;
    const slickSliderWidth = slickSlider?.[0]?.clientWidth
    const slickSlideWidth = slickSlide?.[0]?.clientHeight
    const slideNumber =  slickSliderWidth / (slickSlideWidth+12);
    noOfCards = Math.sign(slideNumber) > 0 ? slideNumber  > 1 ? slideNumber : 1 :1;
    setSlideToShow(noOfCards);
  },
};


  //filter query settings
  const handleChange = (e) => {
    const query = e?.target?.value
    const filterCar =  data.filter((el) => {
      return el.bodyType.includes(query);
    })
    setFilterCar(filterCar);
  }

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null
  return (
    <html>
    <div role="main" className='m-24'>
      <Head>
        <title>Car models</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/svg" sizes="16x16" href="../docs/vercel.svg" />
      </Head>
      <h1 className="leading-5 text-2xl not-italic font-medium font-sans mb-12 flex justify-center text-[#000000eb]">All Models</h1>
      <div className='w-11/12 m-auto flex flex-col mb-12 justify-between items-start md:items-center md:gap-0'>
      <label className='leading-relaxed text-xs tracking-wide not-italic font-medium font-sans text-[#0000008f]' htmlFor="searchForCar">Search for your favourite car</label>
        <input aria-label="Search input" className='p-1 border-black border rounded-md lowercase leading-relaxed text-base tracking-wide not-italic font-light font-sans text-[#aa4242eb]'
          onChange={handleChange}
          type="text"
          id="roll"
          name="roll"
          required
        />
        </div>
    <div role="region" aria-label="Slick window" className="flex flex-col gap-x-10">
      <Slider {...settings}>
        {(filterCar.length >0 ? filterCar : data).map((t, index) => (
          <div key={index} aria-hidden="true">
            <h1 className="uppercase leading-relaxed text-sm tracking-wide not-italic font-medium font-sans text-[#0000008f] mb-2">
              {t.bodyType}
            </h1>
            <h1 className="capitalize leading-6 text-base tracking-wide not-italic font-medium font-sans text-[#000000eb] mb-5">{t.modelName}
              <span role="img" aria-label="from" className="lowercase leading-6 text-base tracking-wide not-italic font-light font-sans text-[#0000008f]"> {t.modelType}</span>
            </h1>
            <Image
              data-i18n-title={t.modelName}
              title={t.modelName}
              aria-label= {t.modelName}
              className='hover:scale-105'
              src={t.imageUrl}
              alt= {t.modelName}
              width={300}
              height={300} />
            <div className = 'flex flex-row flex-1 gap-x-10 mt-5 text-[#2a609d] justify-center'>
              <Link href="/car/[id]" as={`/car/${t.id}`}> <Learn data = {{title:"Learn", i18Title: "Learn More about car" }}/></Link>
              <Link href="https://www.volvocars.com/in/v/cars/s90/shop"> <Learn data = {{title:"Shop", i18Title: "Shop Car"}}/>  </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div></div></html>
  )
}

