import NextAuth from 'next-auth'

declare module "next-auth" {
    interface Session {
        user: {
            _id: string,
            name: string,
            email: string,
            role: string,
            token: string
        }
        booking : {
            id: string,
            campground: string,
            user: string,
            date: Date,
            createdAt: Date
        };

    }
}