import Image from 'next/image'
import arrow from '../docs/chevron-circled.svg'

export default function PrevArrow(props) {
    const { className, onClick } = props;
    return (
      <button title="Prev Arrow"
        className= {className}
        onClick={onClick}>
          <Image className='rotate-180' src={arrow} alt='prevArrow'  width={60} height={60} />
        </button>
    );
  }