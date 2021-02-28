import { AppProps } from 'next/app';
import Link from 'next/link';
import 'styles/globals.scss';
import Search from 'components/Search';
import styles from 'styles/app.module.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Link href="/">
                    <div className={styles.home}>
                        Home
                    </div>
                </Link>
                <div className={styles.search}>
                    <Search />
                </div>
            </div>
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
