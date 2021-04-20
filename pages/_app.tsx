import { createContext, useContext } from 'react';
import 'styles/globals.scss';
import SearchBar from 'components/SearchBar';
import styles from 'pageStyles/App.module.scss';
import { ApiPath, fetchData } from 'utils/fetch';
import { Category } from 'utils/types';
import Menu from 'components/Menu';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import PageHead from 'components/PageHead';

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
            <PageHead />
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
        fetchData(ApiPath.GENRES),
        fetchData(ApiPath.PLATFORMS),
        fetchData(ApiPath.STORES),
    ]);

    return {
        genres: genres?.results || [],
        platforms: platforms?.results || [],
        stores: stores?.results || [],
    };
};

export default App;
