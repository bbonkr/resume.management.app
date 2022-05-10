import React from 'react';
import { appWithTranslation } from 'next-i18next';
import RouterIndicator from '../components/common/RouteIndicator';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';

import '../styles/globals.css';

const SampleApp: React.ComponentType<AppProps> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <React.Fragment>
            <SessionProvider session={session}>
                <Component {...pageProps} />
                <RouterIndicator />
            </SessionProvider>
        </React.Fragment>
    );
};

export default appWithTranslation<AppProps>(SampleApp);
