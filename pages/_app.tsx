import { AppProps } from 'next/app';
import Link from 'next/link';
import 'styles/globals.scss';
import SearchBar from 'components/SearchBar';
import styles from 'styles/app.module.scss';

function App({ Component, pageProps }: AppProps) {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Link href="/">
                    <div className={styles.home}>
                        Home
                    </div>
                </Link>
                <div className={styles.search}>
                    <SearchBar />
                </div>
            </div>
            <Component {...pageProps} />
        </div>
    );
}

export default App;
