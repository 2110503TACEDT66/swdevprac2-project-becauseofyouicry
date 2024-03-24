import TopMenuItem from './TopMenuItem';
import Image from 'next/image';

export default function TopMenu () {
    return (
        <div className="h-[8%] w-full flex" style={{ backgroundColor: '#482B11', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30 }}>
            <Image src={'/img/logo.png'}  alt='logo' width={0} height={0} sizes="100vh" className='h-[70%] w-auto'/>
            <TopMenuItem title='Home' pageRef='/home'/>
            <TopMenuItem title='Booking' pageRef='/booking/'/>
        </div>
    );
}
