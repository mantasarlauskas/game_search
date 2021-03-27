import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { getCategoryAndGamesServerSideProps } from 'utils/categories';
import { ApiPath } from 'utils/fetch';
import { DEFAULT_PAGE_SIZE } from 'utils/page';

function StorePage({ games, count, id, name }: CategoryPageProps) {
    return (
        <CategoryPage
            games={games}
            count={count}
            query={{ stores: id }}
            pageSize={DEFAULT_PAGE_SIZE}
            title={`Games available on ${name}`}
        />
    );
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoryAndGamesServerSideProps(ApiPath.STORES, id, DEFAULT_PAGE_SIZE, { stores: id });
}

export default StorePage;
