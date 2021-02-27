import { AppProps } from 'next/app';
import 'styles/globals.scss';
import Search from 'components/Search';
import styles from 'styles/app.module.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className={styles.root}>
            <Search />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
