import { API_PATH, fetchData, QueryParams } from 'utils/fetch';
import { Route } from 'utils/routes';
import { Category } from 'utils/types';

export function getCategoryTitle(categories: Category[], id: string) {
    return categories.find((category) => category.id === parseInt(id, 10))?.name;
}

export async function getCategoriesServerSideProps(id: string, pageSize: number, query: QueryParams) {
    const data = await fetchData(API_PATH.GAMES, {
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
