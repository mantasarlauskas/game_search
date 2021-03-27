import usePaginatedQuery from 'hooks/usePaginatedQuery';
import { Category } from 'utils/types';
import { ApiPath } from 'utils/fetch';
import CategoriesPage, { CategoriesPageProps } from 'components/CategoriesPage';
import PaginatorButton from 'components/PaginatorButton';
import React from 'react';

function PaginatedCategoriesPage({ categories, title, route, path, nextPage }: PaginatedCategoriesPageProps) {
    const { data, isFetching, paginatorRef, hasNextPage } = usePaginatedQuery<Category, HTMLButtonElement>({
        initialData: categories,
        initialNextPage: nextPage,
        path,
    });

    return (
        <>
            <CategoriesPage
                categories={data}
                title={title}
                route={route}
            />
            <PaginatorButton
                ref={paginatorRef}
                isFetching={isFetching}
                isVisible={!!hasNextPage}
            />
        </>
    );
}

interface PaginatedCategoriesPageProps extends CategoriesPageProps {
    path: ApiPath;
    nextPage?: string;
}

export default PaginatedCategoriesPage;
