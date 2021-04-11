import Head from 'next/head';
import { useRouter } from 'next/router';
import { PageTitle } from 'utils/page';
import { Route } from 'utils/routes';

function PageHead({ title }: PageHeadProps) {
    const { route } = useRouter();
    return (
        <Head>
            <title key="title">{title || PageTitle[route as Route]}</title>
            <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>
    );
}

interface PageHeadProps {
    title?: string | number;
}

export default PageHead;
