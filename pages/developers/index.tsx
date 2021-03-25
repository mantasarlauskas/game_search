import React from 'react';
import { API_PATH, fetchData } from 'utils/fetch';
import { Category } from 'utils/types';
import CategoriesPage from 'components/CategoriesPage';
import { PageTitle } from 'utils/page';
import { Route } from 'utils/routes';
import useAppendableResults from 'hooks/useAppendableResults';
import PaginatorButton from 'components/PaginatorButton';

const pageSize = 20;

function DevelopersPage({ developers, count }: DevelopersPageProps) {
    const { results, loading, paginatorRef, paginatorVisible } = useAppendableResults<Category>({
        initialResults: developers,
        path: API_PATH.DEVELOPERS,
        pageSize,
        count,
    });

    return (
        <>
            <CategoriesPage
                categories={results}
                title={PageTitle.DEVELOPERS}
                route={Route.DEVELOPERS}
            />
            <PaginatorButton
                ref={paginatorRef}
                loading={loading}
                visible={paginatorVisible}
            />
        </>
    );
}

interface DevelopersPageProps {
    developers: Category[];
    count: number;
}

export async function getServerSideProps(): Promise<{ props: DevelopersPageProps }> {
    const data = await fetchData(
        API_PATH.DEVELOPERS,
        {
            page: 1,
            page_size: pageSize,
        },
    );

    return {
        props: {
            count: data?.count || 0,
            developers: data?.results || [],
        },
    };
}

export default DevelopersPage;
