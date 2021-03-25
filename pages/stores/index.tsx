import React from 'react';
import { API_PATH, fetchData } from 'utils/fetch';
import { Category } from 'utils/types';
import CategoriesPage from 'components/CategoriesPage';
import { PageTitle } from 'utils/page';
import { Route } from 'utils/routes';

function StoresPage({ stores }: StoresPageProps) {
    return (
        <CategoriesPage
            categories={stores}
            title={PageTitle.STORES}
            route={Route.STORES}
        />
    );
}

interface StoresPageProps {
    stores: Category[];
}

export async function getServerSideProps(): Promise<{ props: StoresPageProps }> {
    const data = await fetchData(API_PATH.STORES);
    return {
        props: {
            stores: data?.results || [],
        },
    };
}

export default StoresPage;
