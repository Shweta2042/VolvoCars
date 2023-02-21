import Image from 'next/image'
import arrow from '../docs/chevron-circled.svg'

export default function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className= {className}
        onClick={onClick}>
          <Image className='rotate-180' src={arrow} alt='next'  width={60} height={60} />
        </div>
    );
  }