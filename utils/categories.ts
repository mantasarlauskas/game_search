import { ApiPath, fetchData, QueryParams } from 'utils/fetch';
import { Route } from 'utils/routes';
import { Category } from 'utils/types';
import { DEFAULT_PAGE_SIZE } from 'utils/page';

export function getCategoryTitle(categories: Category[], id: string) {
    return categories.find((category) => category.id === parseInt(id, 10))?.name;
}

export async function getCategoryPageServerSideProps(id: string, pageSize: number, query: QueryParams) {
    const data = await fetchData(ApiPath.GAMES, {
        page: 1,
        page_size: pageSize,
        ...query,
    });

    if (!data?.count || !data?.results) {
        return {
            redirect: {
                destination: Route.NOT_FOUND,
                permanent: false,
            },
        };
    }

    return {
        props: {
            id,
            count: data.count,
            games: data.results,
        },
    };
}

export async function getCategoryAndGamesServerSideProps(
    path: ApiPath,
    id: string,
    pageSize: number,
    query: QueryParams,
) {
    const [data, category] = await Promise.all([
        fetchData(ApiPath.GAMES, {
            page: 1,
            page_size: pageSize,
            ...query,
        }),
        fetchData(`${path}/${id}`),
    ]);

    if (!data?.count || !data?.results || !category?.name) {
        return {
            redirect: {
                destination: Route.NOT_FOUND,
                permanent: false,
            },
        };
    }

    return {
        props: {
            id,
            count: data.count,
            games: data.results,
            name: category.name,
        },
    };
}

export async function getCategoriesPageServerSideProps(path: ApiPath, pageSize = DEFAULT_PAGE_SIZE) {
    const data = await fetchData(
        path,
        {
            page: 1,
            page_size: pageSize,
        },
    );

    return {
        props: {
            count: data?.count || 0,
            categories: data?.results || [],
        },
    };
}
