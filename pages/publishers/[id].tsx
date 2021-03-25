import { Game, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { getCategoryAndGamesServerSideProps } from 'utils/categories';
import { API_PATH } from 'utils/fetch';

const pageSize = 20;

function PublisherPage({ games, count, id, name }: PublisherPageProps) {
    return (
        <CategoryPage
            games={games}
            count={count}
            query={{ publishers: id }}
            pageSize={pageSize}
            title={`Published by ${name}`}
        />
    );
}

interface PublisherPageProps {
    id: string;
    games: Game[];
    count: number;
    name: string;
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoryAndGamesServerSideProps(API_PATH.PUBLISHERS, id, pageSize, { publishers: id });
}

export default PublisherPage;
