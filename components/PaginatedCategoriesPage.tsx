import useAppendableResults from 'hooks/useAppendableResults';
import { Category } from 'utils/types';
import { ApiPath } from 'utils/fetch';
import { DEFAULT_PAGE_SIZE } from 'utils/page';
import CategoriesPage, { CategoriesPageProps } from 'components/CategoriesPage';
import PaginatorButton from 'components/PaginatorButton';
import React from 'react';

function PaginatedCategoriesPage({ categories, title, route, count, path }: PaginatedCategoriesPageProps) {
    const { results, loading, paginatorRef, paginatorVisible } = useAppendableResults<Category>({
        initialResults: categories,
        pageSize: DEFAULT_PAGE_SIZE,
        path,
        count,
    });

    return (
        <>
            <CategoriesPage
                categories={results}
                title={title}
                route={route}
            />
            <PaginatorButton
                ref={paginatorRef}
                loading={loading}
                visible={paginatorVisible}
            />
        </>
    );
}

interface PaginatedCategoriesPageProps extends CategoriesPageProps {
    count: number;
    path: ApiPath;
}

export default PaginatedCategoriesPage;
