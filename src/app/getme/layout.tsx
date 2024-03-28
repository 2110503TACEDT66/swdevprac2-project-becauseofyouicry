import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import NextAuthProvider from "@/providers/NextAuthProvider"
export default async function GetmeLayout({children} : {children : React.ReactNode}){
    const nextAuthSession = await getServerSession(authOptions)
    return(
        <div>
            <NextAuthProvider session={nextAuthSession}>
                {children}
            </NextAuthProvider>
        </div>
    )
}