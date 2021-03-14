import React, { createContext, useContext } from 'react';
import 'styles/globals.scss';
import SearchBar from 'components/SearchBar';
import styles from 'styles/app.module.scss';
import { API_PATH, fetchData } from 'utils/fetch';
import { Genre, PageAppProps } from 'utils/types';
import Menu from 'components/Menu';

const AppContext = createContext<{ genres: Genre[] }>({ genres: [] });

function App({ Component, pageProps, genres }: PageAppProps) {
    return (
        <div className={styles.root}>
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
