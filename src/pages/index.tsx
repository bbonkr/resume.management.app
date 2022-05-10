import React, { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Layout from '../components/common/Layout';
import Content from '../components/Content';
import Navigator from '../components/Navigator';
import { useSession, signIn, signOut } from 'next-auth/react';
import { WeatherForecast, WeatherForecastApi } from '../api';
import Axios from 'axios';
import useSWR from 'swr';

const HomePage = () => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const { data: session } = useSession();
    const [readyToGetData, setReadyToGetData] = useState(false);
    const { data, error, isValidating } = useSWR(
        readyToGetData ? 'WeatherForecastApi-apiv10WeatherForecastGet' : null,
        async () => {
            const axios = Axios.create({
                headers: {
                    Authorization: `${session?.tokenType} ${
                        session?.token ?? ''
                    }`,
                },
            });
            const api = new WeatherForecastApi(
                undefined,
                process.env.NEXT_PUBLIC_API_URL,
                axios,
            );

            const responseData = await api
                .apiv10WeatherForecastGet()
                .then((response) => {
                    // setWeatherForcasts(() => response.data);
                    return response.data;
                })
                .catch((e) => {
                    console.info(e);

                    throw e;
                });

            return responseData;
        },
    );
    // const [weatherForcasts, setWeatherForcasts] = useState<WeatherForecast[]>(
    //     [],
    // );

    const handleClickNavigate = useCallback(() => {
        router.push('/about');
    }, []);

    const handleClickGetApiV1WeatherForcast = () => {
        // const axios = Axios.create({
        //     headers: {
        //         Authorization: `Bearer ${session?.token ?? ''}`,
        //     },
        // });
        // const api = new WeatherForecastApi(
        //     undefined,
        //     process.env.NEXT_PUBLIC_API_URL,
        //     axios,
        // );
        // api.apiv10WeatherForecastGet()
        //     .then((response) => {
        //         setWeatherForcasts(() => response.data);
        //     })
        //     .catch((e) => {
        //         console.error(e);
        //     });
        setReadyToGetData((_) => true);
    };

    return (
        <Layout>
            <Content title={t('index.title')} />
            <div>
                {session ? (
                    <button onClick={() => signOut()}>Sign out</button>
                ) : (
                    <button onClick={() => signIn()}>Sign In</button>
                )}
            </div>
            <div>
                <button onClick={handleClickGetApiV1WeatherForcast}>
                    GET: /api/v1/weatherforcast
                </button>
            </div>
            <div>
                {isValidating ? (
                    <span>Loading ...</span>
                ) : error ? (
                    <span>{JSON.stringify(error, null, 4)} </span>
                ) : (
                    <ul>
                        {data?.map((x) => (
                            <li key={x.date}>{x.date}</li>
                        ))}
                    </ul>
                )}
            </div>
            <hr />

            <Navigator
                href="/about"
                label={t('about.title')}
                onClick={handleClickNavigate}
            />
        </Layout>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default HomePage;
