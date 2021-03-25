import { Game, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { getCategoryAndGamesServerSideProps } from 'utils/categories';
import { API_PATH } from 'utils/fetch';

const pageSize = 20;

function DeveloperPage({ games, count, id, name }: DeveloperPageProps) {
    return (
        <CategoryPage
            games={games}
            count={count}
            query={{ developers: id }}
            pageSize={pageSize}
            title={`Developed by ${name}`}
        />
    );
}

interface DeveloperPageProps {
    id: string;
    games: Game[];
    count: number;
    name: string;
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoryAndGamesServerSideProps(API_PATH.DEVELOPERS, id, pageSize, { developers: id });
}

export default DeveloperPage;
