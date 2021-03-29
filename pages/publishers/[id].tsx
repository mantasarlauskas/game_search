import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { getCategoryAndGamesServerSideProps } from 'utils/categories';
import { ApiPath } from 'utils/fetch';

function PublisherPage({ games, count, id, name, nextPage }: CategoryPageProps) {
    return (
        <CategoryPage
            name={name}
            games={games}
            count={count}
            nextPage={nextPage}
            queryParams={{ publishers: id }}
            title={`Published by ${name}`}
        />
    );
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoryAndGamesServerSideProps(ApiPath.PUBLISHERS, id, { publishers: id });
}

export default PublisherPage;
