import NextAuth from 'next-auth';
import OidcProvider from '../../../lib/auth/providers/OidcProvider';

interface UserInfoResponse {
    sub: string;
    name: string;
    role: string[];
    email: string;
    emain_verified: boolean;
    profile?: string;
    image?: string;
}

const nextAuth = NextAuth({
    providers: [
        OidcProvider({
            id: process.env.NEXTAUTH_ID ?? '',
            name: process.env.NEXTAUTH_NAME ?? '',
            issuer: process.env.NEXTAUTH_ISSUER ?? '',
            scope: process.env.NEXTAUTH_SCOPE ?? '',
            clientId: process.env.NEXTAUTH_CLIENT_ID ?? '',
            clientSecret: process.env.NEXTAUTH_CLIENT_SECRET ?? '',
            async profile(profile, tokens) {
                console.info(
                    '[providers][OidcProvider][profile]: [profile, tokens]',
                    profile,
                    tokens,
                );

                const response = await fetch(
                    `${process.env.NEXTAUTH_ISSUER}/connect/userinfo`,
                    {
                        headers: {
                            ['authorization']: `${tokens.token_type} ${tokens.access_token}`,
                        },
                    },
                );

                if (response.status < 300 && response.status >= 200) {
                    const userInfo: UserInfoResponse = await response.json();

                    console.info(
                        '[providers][OidcProvider][profile][userinfo]: ',
                        userInfo,
                    );

                    return {
                        id: userInfo.sub,
                        name: userInfo.name,
                        email: userInfo.email,
                        image: userInfo.profile,
                        roles: userInfo.role,
                        tokenType: tokens.token_type,
                        accessToken: tokens.access_token,
                        refreshToken: tokens.refresh_token,
                    };
                } else {
                    throw new Error('Could not access user info');
                }

                // return {
                //   id: profile.sub,
                //   name: profile.name,
                //   email: profile.email,
                //   image: profile.picture,
                // };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async signIn({ user, profile, account, email, credentials }) {
            console.info(
                '[callbacks][signIn]: [user, profile, account, email, credentials]',
                // user,
                // profile,
                // account,
                // email,
                // credentials,
            );
            return true;
        },
        async redirect({ url, baseUrl }) {
            console.info(
                '[callbacks][redirect]: [url, baseUrl]',
                // url,
                // baseUrl
            );
            // return baseUrl;
            return url ?? baseUrl;
        },

        async jwt({ token, account, profile, user }) {
            // console.info('[callbacks][jwt]');
            console.info(
                '[callbacks][jwt] [token, account, profile, user]',
                token,
                account,
                profile,
                user,
            );

            if (account) {
                token.tokenType = account.token_type;
                token.accessToken = account.access_token;
            }
            if (user) {
                // token.sub = user.id;
                token.roles = user.roles as string[];
                token.image = user.image as string;
            }

            return token;
        },

        async session({ session, token, user }) {
            console.info(
                '[callbacks][session]: (session, token, user)',
                session,
                token,
                user,
            );

            if (session.user) {
                session.user.id = token.sub;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.roles = token.roles as string[];
                session.user.image = token.image as string;
            }

            if (token) {
                session.tokenType = token.tokenType as string;
                session.token = token.accessToken as string;
            }

            return session;
        },
    },
    theme: {
        colorScheme: 'auto',
    },
    debug: false, //process.env.NODE_ENV !== 'production',
});

export default nextAuth;
