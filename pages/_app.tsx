import React, { createContext, useContext } from 'react';
import 'styles/globals.scss';
import Head from 'next/head';
import SearchBar from 'components/SearchBar';
import styles from 'styles/app.module.scss';
import { ApiPath, fetchData } from 'utils/fetch';
import { Category } from 'utils/types';
import Menu from 'components/Menu';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

interface AppContextTypes {
    genres: Category[];
    platforms: Category[];
    stores: Category[];
}

const AppContext = createContext<AppContextTypes>({
    genres: [],
    platforms: [],
    stores: [],
});

const queryClient = new QueryClient();

function App({ Component, pageProps, genres, platforms, stores }: AppProps & AppContextTypes) {
    return (
        <div className={styles.root}>
            <Head>
                <title>Game search</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </Head>
            <AppContext.Provider value={{ genres, platforms, stores }}>
                <div className={styles.menu}>
                    <Menu />
                </div>
                <QueryClientProvider client={queryClient}>
                    <div className={styles.content}>
                        <div className={styles.search}>
                            <SearchBar />
                        </div>
                        <Component {...pageProps} />
                    </div>
                </QueryClientProvider>
            </AppContext.Provider>
        </div>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}

App.getInitialProps = async () => {
    const [genres, platforms, stores] = await Promise.all([
        await fetchData(ApiPath.GENRES),
        await fetchData(ApiPath.PLATFORMS),
        await fetchData(ApiPath.STORES),
    ]);

    return {
        genres: genres?.results || [],
        platforms: platforms?.results || [],
        stores: stores?.results || [],
    };
};

export default App;
