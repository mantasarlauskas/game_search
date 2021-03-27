import React from 'react';
import { ApiPath } from 'utils/fetch';
import { CategoriesPageProps } from 'utils/types';
import { PageTitle } from 'utils/page';
import { Route } from 'utils/routes';
import PaginatedCategoriesPage from 'components/PaginatedCategoriesPage';
import { getCategoriesPageServerSideProps } from 'utils/categories';

function TagsPage({ categories, count }: CategoriesPageProps) {
    return (
        <PaginatedCategoriesPage
            count={count}
            path={ApiPath.TAGS}
            categories={categories}
            title={PageTitle.TAGS}
            route={Route.TAGS}
        />
    );
}

export async function getServerSideProps(): Promise<{ props: CategoriesPageProps }> {
    return getCategoriesPageServerSideProps(ApiPath.TAGS);
}

export default TagsPage;
