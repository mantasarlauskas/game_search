import React from 'react';
import { API_PATH, fetchData } from 'utils/fetch';
import { Category } from 'utils/types';
import CategoriesPage from 'components/CategoriesPage';
import { PageTitle } from 'utils/page';
import { Route } from 'utils/routes';
import useAppendableResults from 'hooks/useAppendableResults';
import PaginatorButton from 'components/PaginatorButton';

const pageSize = 20;

function PublishersPage({ publishers, count }: PublishersPageProps) {
    const { results, loading, paginatorRef, paginatorVisible } = useAppendableResults<Category>({
        initialResults: publishers,
        path: API_PATH.PUBLISHERS,
        pageSize,
        count,
    });

    return (
        <>
            <CategoriesPage
                categories={results}
                title={PageTitle.PUBLISHERS}
                route={Route.PUBLISHERS}
            />
            <PaginatorButton
                ref={paginatorRef}
                loading={loading}
                visible={paginatorVisible}
            />
        </>
    );
}

interface PublishersPageProps {
    publishers: Category[];
    count: number;
}

export async function getServerSideProps(): Promise<{ props: PublishersPageProps }> {
    const data = await fetchData(
        API_PATH.PUBLISHERS,
        {
            page: 1,
            page_size: pageSize,
        },
    );

    return {
        props: {
            count: data?.count || 0,
            publishers: data?.results || [],
        },
    };
}

export default PublishersPage;
