import { Game, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { API_PATH, fetchData } from 'utils/fetch';
import { Route } from 'utils/routes';

const pageSize = 20;

function TagPage({ games, count, id, name }: TagPageProps) {
    return (
        <CategoryPage
            games={games}
            count={count}
            query={{ tags: id }}
            pageSize={pageSize}
            title={`${name} Games`}
        />
    );
}

interface TagPageProps {
    id: string;
    games: Game[];
    count: number;
    name: string;
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    const [data, tag] = await Promise.all([
        fetchData(API_PATH.GAMES, {
            page: 1,
            page_size: pageSize,
            tags: id,
        }),
        fetchData(`${API_PATH.TAGS}/${id}`),
    ]);

    if (!data?.count || !data?.results || !tag?.name) {
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
            name: tag.name,
        },
    };
}

export default TagPage;
