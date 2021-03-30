import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { getCategoryAndGamesServerSideProps } from 'utils/categories';
import { ApiPath } from 'utils/fetch';

function StorePage({ games, count, id, name, nextPage }: CategoryPageProps) {
    return (
        <CategoryPage
            name={name}
            games={games}
            count={count}
            nextPage={nextPage}
            queryParams={{ stores: id }}
            title={`Games available on ${name}`}
        />
    );
}

export async function getServerSideProps({ params: { id }, query }: NextPageContextWithID) {
    return getCategoryAndGamesServerSideProps(query, ApiPath.STORES, id, { stores: id });
}

export default StorePage;
