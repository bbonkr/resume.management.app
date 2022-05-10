import { OAuthConfig, OAuthUserConfig } from 'next-auth/providers/oauth';

interface UserProfile {
    sub: string;
    name: string;
    email: string;
    picture?: string;
    roles: string[];
}

interface OidcProviderOptions extends OAuthUserConfig<UserProfile> {
    id: string;
    name?: string;
    issuer: string;
    scope: string;
}

interface OidcConfig extends OAuthConfig<UserProfile> {
    id: string;
    name: string;
}

const OidcProvider = (
    options: Partial<OidcProviderOptions> &
        Pick<
            OidcProviderOptions,
            'id' | 'issuer' | 'scope' | 'clientId' | 'clientSecret'
        >,
): OidcConfig => {
    return {
        ...options,
        id: options.id,
        name: options.name ?? options.id,
        type: 'oauth',

        wellKnown: `${options.issuer}/.well-known/openid-configuration`,
        authorization: {
            params: { scope: options.scope },
        },
        idToken: true,
        checks: ['pkce', 'state'],
        profile(profile, tokens) {
            // console.info('OidcProvider:profile() [profile, tokens]', profile, tokens);
            return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
            };
        },
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        options: options as OAuthUserConfig<UserProfile>,
    };
};
export default OidcProvider;
