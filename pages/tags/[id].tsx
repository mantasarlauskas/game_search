import { CategoryPageProps, NextPageContextWithID } from 'utils/types';
import CategoryPage from 'components/CategoryPage';
import { ApiPath } from 'utils/fetch';
import { getCategoryAndGamesServerSideProps } from 'utils/categories';
import { DEFAULT_PAGE_SIZE } from 'utils/page';

function TagPage({ games, count, id, name }: CategoryPageProps) {
    return (
        <CategoryPage
            games={games}
            count={count}
            query={{ tags: id }}
            pageSize={DEFAULT_PAGE_SIZE}
            title={`${name} Games`}
        />
    );
}

export async function getServerSideProps({ params: { id } }: NextPageContextWithID) {
    return getCategoryAndGamesServerSideProps(ApiPath.TAGS, id, DEFAULT_PAGE_SIZE, { tags: id });
}

export default TagPage;
