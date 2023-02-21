import Image from 'next/image'
import arrow from '../docs/chevron-circled.svg'

export default function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}>
          <Image  src={arrow} alt='next'  width={60} height={60} />
        </div>
    );
  }

  //className='h-96 max-w-xs w-10'