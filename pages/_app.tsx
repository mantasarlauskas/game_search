import React, { createContext, useContext } from 'react';
import 'styles/globals.scss';
import Head from 'next/head';
import SearchBar from 'components/SearchBar';
import styles from 'styles/app.module.scss';
import { API_PATH, fetchData } from 'utils/fetch';
import { Category } from 'utils/types';
import Menu from 'components/Menu';
import useScrollToTop from 'hooks/useScrollToTop';
import { AppProps } from 'next/app';

interface AppContextTypes {
    genres: Category[];
    platforms: Category[];
}

const AppContext = createContext<AppContextTypes>({ genres: [], platforms: [] });

function App({ Component, pageProps, genres, platforms }: PageAppProps) {
    useScrollToTop();
    return (
        <div className={styles.root}>
            <Head>
                <title>Game search</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </Head>
            <div className={styles.menu}>
                <Menu
                    genres={genres}
                    platforms={platforms}
                />
            </div>
            <div className={styles.content}>
                <div className={styles.search}>
                    <SearchBar />
                </div>
                <AppContext.Provider value={{ genres, platforms }}>
                    <Component {...pageProps} />
                </AppContext.Provider>
            </div>
        </div>
    );
}

interface PageAppProps extends AppProps {
    genres: Category[];
    platforms: Category[];
}

export function useAppContext() {
    return useContext(AppContext);
}

App.getInitialProps = async () => {
    const [genres, platforms] = await Promise.all([
        await fetchData(API_PATH.GENRES),
        await fetchData(API_PATH.PLATFORMS),
    ]);

    return {
        genres: genres?.results || [],
        platforms: platforms?.results || [],
    };
};

export default App;
