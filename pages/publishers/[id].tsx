import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { getCategoryAndGamesServerSideProps } from 'utils/categories';
import { ApiPath } from 'utils/fetch';
import { DEFAULT_PAGE_SIZE } from 'utils/page';

function PublisherPage({ games, count, id, name }: CategoryPageProps) {
    return (
        <CategoryPage
            games={games}
            count={count}
            query={{ publishers: id }}
            pageSize={DEFAULT_PAGE_SIZE}
            title={`Published by ${name}`}
        />
    );
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoryAndGamesServerSideProps(ApiPath.PUBLISHERS, id, DEFAULT_PAGE_SIZE, { publishers: id });
}

export default PublisherPage;
