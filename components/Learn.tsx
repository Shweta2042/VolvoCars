import Image from 'next/image'
import arrow from '../docs/chevron-small.svg'

export default function Learn(props) {
  return (
    <div role="button" data-i18n-title={props?.data?.i18Title} title={props?.data?.i18Title} aria-label={props?.data?.title} className='flex flex-row flex-1 gap-x-2'>
      <div>
        {props?.data?.title}
      </div>
      <Image className='' src={arrow} alt='next' width={10} height={10}></Image>
    </div>
  );
}