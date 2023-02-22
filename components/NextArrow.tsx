import Image from 'next/image'
import { useEffect, useRef } from 'react';
import arrow from '../docs/chevron-circled.svg'

export default function NextArrow(props) {
  const { className, onClick } = props;
  const ref = useRef(null);
  useEffect(
    function () {
      ref?.current?.focus();
    }, []
  )
  return (
    <button title="Next arrow" ref={ref}
      className={className}
      onClick={onClick}>
      <Image src={arrow} alt='nextArrow' width={60} height={60} />
    </button>
  );
}
