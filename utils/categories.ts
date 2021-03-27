import { ApiPath, fetchData, QueryParams } from 'utils/fetch';
import { Route } from 'utils/routes';
import { Category } from 'utils/types';
import { DEFAULT_PAGE_SIZE } from 'utils/page';

export function getCategoryTitle(categories: Category[], id: string) {
    return categories.find((category) => category.id === parseInt(id, 10))?.name;
}

export async function getCategoryPageServerSideProps(id: string, query: QueryParams) {
    const data = await fetchData(ApiPath.GAMES, {
        page: 1,
        page_size: DEFAULT_PAGE_SIZE,
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
            nextPage: data.next,
        },
    };
}

export async function getCategoryAndGamesServerSideProps(
    path: ApiPath,
    id: string,
    query: QueryParams,
) {
    const [data, category] = await Promise.all([
        fetchData(ApiPath.GAMES, {
            page: 1,
            page_size: DEFAULT_PAGE_SIZE,
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
            nextPage: data.next,
        },
    };
}

export async function getCategoriesPageServerSideProps(path: ApiPath) {
    const data = await fetchData(
        path,
        {
            page: 1,
            page_size: DEFAULT_PAGE_SIZE,
        },
    );

    return {
        props: {
            categories: data?.results || [],
            nextPage: data?.next,
        },
    };
}
