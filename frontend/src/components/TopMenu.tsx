import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Link } from "@mui/material";
import { getServerSession } from "next-auth";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import styles from "./topmenu.module.css";
import Profile from "./profile";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  return (
    <div className={styles.menucontainer}>
      <Image
        src={"/img/logo.png"}
        id="logoimage"
        className={styles.logoimg}
        alt="logo"
        width={0}
        height={0}
        sizes="100vh"
      />
      <TopMenuItem title="Main" pageRef="/" />
      <TopMenuItem title="Booking" pageRef="/booking" />
      <TopMenuItem title="About us" pageRef="/aboutus" />

      {session ? (
        <>
          <Link href="/getme">
            <div className="flex items-center absolute right-2 h-full px-2 text-white text-sm hover:underline underline-offset-2 font-bold duration-500">
              <Profile />
            </div>
          </Link>
        </>
      ) : (
        <Link href="/api/auth/signin">
          <div className="flex items-center absolute right-2 h-full px-2 text-white text-base hover:underline underline-offset-2 font-bold duration-500">
            sign in
          </div>
        </Link>
      )}
    </div>
  );
}
