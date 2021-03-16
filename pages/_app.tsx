import React, { createContext, useContext } from 'react';
import 'styles/globals.scss';
import Head from 'next/head';
import SearchBar from 'components/SearchBar';
import styles from 'styles/app.module.scss';
import { API_PATH, fetchData } from 'utils/fetch';
import { Genre, PageAppProps } from 'utils/types';
import Menu from 'components/Menu';
import useScrollToTop from 'hooks/useScrollToTop';

const AppContext = createContext<{ genres: Genre[] }>({ genres: [] });

function App({ Component, pageProps, genres }: PageAppProps) {
    useScrollToTop();
    return (
        <div className={styles.root}>
            <Head>
                <title>Game search</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div className={styles.menu}>
                <Menu genres={genres} />
            </div>
            <div className={styles.content}>
                <div className={styles.search}>
                    <SearchBar />
                </div>
                <AppContext.Provider value={{ genres }}>
                    <Component {...pageProps} />
                </AppContext.Provider>
            </div>
        </div>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}

App.getInitialProps = async () => {
    const response = await fetchData(API_PATH.GENRES);
    return {
        genres: response?.results || [],
    };
};

export default App;
