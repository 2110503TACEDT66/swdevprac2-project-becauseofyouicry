import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Link } from '@mui/material';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import styles from './topmenu.module.css';

export default async function TopMenu() {

    const session = await getServerSession(authOptions)

    return (
            <div className={styles.menucontainer}>
            <Image src={'/img/logo.png'} id='logoimage' className={styles.logoimg} alt='logo'
            width={0} height={0} sizes='100vh'/>
            <TopMenuItem title='Main' pageRef='/'/>
            <TopMenuItem title='Campgrounds' pageRef='/campgrounds'/>
            <TopMenuItem title='Booking' pageRef='/booking'/>
            <TopMenuItem title='About us' pageRef='/aboutus'/>
                
                    {
                        session? <Link href="/api/auth/signout">
                            <div className='flex items-center absolute right-0 h-full px-2 absolute right-5 text-cyan-600 text-sm'>Sign-Out</div>
                            </Link>
                        : <Link href="/api/auth/signin">
                            <div className='flex items-center absolute right-0 h-full px-2 absolute right-5 text-cyan-600 text-sm'>Sign-In</div></Link>
                    }
                
            </div>
    );
}