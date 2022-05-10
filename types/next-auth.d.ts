import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    // interface User {
    //   sub: string;
    //   name: string;
    //   role: string[];
    //   email: string;
    //   emain_verified: boolean;
    // }

    /**
     * Usually contains information about the provider being used
     * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
     */
    // interface Account {}

    /** The OAuth profile returned from your provider */
    // interface Profile {}

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        tokenType?: string;
        token?: string;
        user: {
            /** The user's postal address. */
            id?: string;
            roles: string[];
            image?: string;
        } & DefaultSession['user'];
    }
}
