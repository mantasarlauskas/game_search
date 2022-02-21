import { CategoryPageWithNameProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { getCategoryAndGamesServerSideProps } from 'utils/categories';
import { ApiPath } from 'utils/fetch';

function PublisherPage({
    games,
    count,
    id,
    name,
    nextPage,
}: CategoryPageWithNameProps) {
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

export async function getServerSideProps({
    params: { id },
    query,
}: NextPageContextWithID) {
    return getCategoryAndGamesServerSideProps(query, ApiPath.PUBLISHERS, id, {
        publishers: id,
    });
}

export default PublisherPage;
