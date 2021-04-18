import styles from 'pageStyles/ErrorPage.module.scss';
import { NextPageContext } from 'next';

function ErrorPage({ statusCode }: ErrorPageProps) {
    const text = statusCode ? 'Server side error' : 'This page could not be found';
    const status = statusCode || 404;
    return (
        <div className={styles.root}>
            <div className={styles.statusCode}>
                {status}
            </div>
            {text}
        </div>
    );
}

interface ErrorPageProps {
    statusCode?: number;
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => ({
    statusCode: res?.statusCode || err?.statusCode,
});

export default ErrorPage;
