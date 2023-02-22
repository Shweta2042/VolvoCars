import Image from 'next/image'
import arrow from '../docs/chevron-circled.svg'

export default function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        className={className}
        onClick={onClick}>
          <Image  src={arrow} alt='next'  width={60} height={60} />
        </button>
    );
  }
