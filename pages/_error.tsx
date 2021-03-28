import styles from 'styles/error.module.scss';
import { NextPageContext } from 'next';

function ErrorPage({ statusCode }: ErrorPageProps) {
    const text = statusCode ? 'Server side error' : 'This page could not be found';
    return (
        <div className={styles.root}>
            <div className={styles.statusCode}>
                {statusCode || '404'}
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
