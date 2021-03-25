import { Game, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { API_PATH } from 'utils/fetch';
import { getCategoryAndGamesServerSideProps } from 'utils/categories';

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
    return getCategoryAndGamesServerSideProps(API_PATH.TAGS, id, pageSize, { tags: id });
}

export default TagPage;
