import { Game, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { getCategoryAndGamesServerSideProps } from 'utils/categories';
import { API_PATH } from 'utils/fetch';

const pageSize = 20;

function StorePage({ games, count, id, name }: StorePageProps) {
    return (
        <CategoryPage
            games={games}
            count={count}
            query={{ stores: id }}
            pageSize={pageSize}
            title={`Games available on ${name}`}
        />
    );
}

interface StorePageProps {
    id: string;
    games: Game[];
    count: number;
    name: string;
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoryAndGamesServerSideProps(API_PATH.STORES, id, pageSize, { stores: id });
}

export default StorePage;
