import React from 'react';
import { ApiPath } from 'utils/fetch';
import { CategoriesPageProps } from 'utils/types';
import { PageTitle } from 'utils/page';
import { Route } from 'utils/routes';
import PaginatedCategoriesPage from 'components/PaginatedCategoriesPage';
import { getCategoriesPageServerSideProps } from 'utils/categories';

function DevelopersPage({ categories, count }: CategoriesPageProps) {
    return (
        <PaginatedCategoriesPage
            count={count}
            path={ApiPath.DEVELOPERS}
            categories={categories}
            title={PageTitle.DEVELOPERS}
            route={Route.DEVELOPERS}
        />
    );
}

export async function getServerSideProps(): Promise<{ props: CategoriesPageProps }> {
    return getCategoriesPageServerSideProps(ApiPath.DEVELOPERS);
}

export default DevelopersPage;
