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
            <TopMenuItem title='Booking' pageRef='/booking'/>
            <Image src={'/img/logo.png'} className={styles.logoimg} alt='logo'
            width={0} height={0} sizes='100vh'/>

            {
                session? <Link href="/api/auth/signout">
                    <div className='flex items-center absolute left-0 h-full px-2 text-cyan-600 text-sm'>Sign-Out</div>
                    </Link>
                : <Link href="/api/auth/signin">
                    <div className='flex items-center absolute left-0 h-full px-2 text-cyan-600 text-sm'>Sign-In</div></Link>
            }
        </div>
    );
}